from app.models import db, User, Subreddit, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds seed data for posts
def seed_posts():
    users = User.query.all()
    subreddits = Subreddit.query.all()
    posts = [
        Post(title='Important breaking news', content='...', author=users[0], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='How to optimize your code', content='...', author=users[1], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='Interesting article about Python', content='...', author=users[2], subreddit=subreddits[1], created_at=datetime.utcnow())
    ]
    db.session.add_all(posts)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the posts table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
