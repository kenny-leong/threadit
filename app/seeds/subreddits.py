from app.models import db, User, Subreddit, SubredditMember, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds a demo subreddit, you can add other subreddits here if you want
def seed_subreddits():
    subreddits = [
        Subreddit(name='AskThreadit', description='Ask and answer questions'),
        Subreddit(name='aww', description='Cute and cuddly animals'),
        Subreddit(name='todayilearned', description='Learn something new every day'),
        Subreddit(name='worldnews', description='News from around the world'),
        Subreddit(name='funny', description='Funny memes and jokes'),
        Subreddit(name='news', description='Current events'),
        Subreddit(name='programming', description='Programming and software development')
    ]

    # Assign a creator to each subreddit
    users = User.query.all()
    for i in range(len(subreddits)):
        subreddit = subreddits[i]
        creator = users[i % len(users)]
        subreddit.creator_id = creator.id
        subreddit.created_at = datetime.utcnow()
        db.session.add(subreddit)
        db.session.flush()

        member = SubredditMember(user_id=creator.id, subreddit_id=subreddit.id)
        db.session.add(member)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the subreddits table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_subreddits():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subreddit_members RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.subreddits RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM subreddit_members"))
        db.session.execute(text("DELETE FROM subreddits"))

    db.session.commit()
