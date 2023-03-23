from app.models import db, User, Post, Comment, Vote, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds seed data for votes
# Adds seed data for votes
def seed_votes():
    user1 = User.query.filter_by(username='Demo').first()
    user2 = User.query.filter_by(username='marnie').first()
    user3 = User.query.filter_by(username='bobbie').first()

    post1 = Post.query.filter_by(title='Genshin Impact addiction— Gamer spends $40,000 on gacha characters').first()
    post2 = Post.query.filter_by(title='How to optimize your code').first()
    post3 = Post.query.filter_by(title='Interesting article about Python').first()

    comment1 = Comment.query.filter_by(content='This is great news!').first()
    comment2 = Comment.query.filter_by(content='Thanks for sharing').first()
    comment3 = Comment.query.filter_by(content='I disagree with your point').first()
    comment4 = Comment.query.filter_by(content='Can you clarify what you mean?').first()
    comment5 = Comment.query.filter_by(content='I found this article really interesting').first()
    comment6 = Comment.query.filter_by(content='This is a great resource for beginners').first()

    votes = [
        Vote(user=user1, post=post1, type='upvote'),
        Vote(user=user2, post=post1, type='downvote'),
        Vote(user=user3, post=post2, type='upvote'),
        Vote(user=user1, post=post2, type='upvote'),
        Vote(user=user2, post=post3, type='upvote'),
        Vote(user=user3, post=post3, type='downvote'),
        Vote(user=user1, comment=comment1, type='upvote'),
        Vote(user=user2, comment=comment1, type='downvote'),
        Vote(user=user3, comment=comment2, type='upvote'),
        Vote(user=user1, comment=comment2, type='upvote'),
        Vote(user=user2, comment=comment3, type='upvote'),
        Vote(user=user3, comment=comment4, type='downvote'),
        Vote(user=user1, comment=comment5, type='upvote'),
        Vote(user=user2, comment=comment5, type='downvote'),
        Vote(user=user3, comment=comment6, type='upvote')
    ]

    db.session.add_all(votes)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_votes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.votes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM votes"))

    db.session.commit()
