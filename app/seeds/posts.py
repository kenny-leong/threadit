from app.models import db, User, Subreddit, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds seed data for posts
def seed_posts():
    user1 = User.query.filter_by(username='Demo').first()
    user2 = User.query.filter_by(username='marnie').first()
    user3 = User.query.filter_by(username='bobbie').first()

    sub1 = Subreddit.query.filter_by(name='news').first()
    sub2 = Subreddit.query.filter_by(name='programming').first()

    post1 = Post(title='Important breaking news', content='...', author=user1, subreddit=sub1, created_at=datetime.utcnow())
    post2 = Post(title='How to optimize your code', content='...', author=user2, subreddit=sub2, created_at=datetime.utcnow())
    post3 = Post(title='Interesting article about Python', content='...', author=user3, subreddit=sub2, created_at=datetime.utcnow())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
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
