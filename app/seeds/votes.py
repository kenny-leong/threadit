from app.models import db, User, Post, Comment, Vote, environment, SCHEMA
from sqlalchemy.sql import text
from random import choice
from faker import Faker


# Adds seed data for votes
def seed_votes():
    users = User.query.all()
    posts = Post.query.all()
    fake = Faker()

    # Create dictionary to keep track of which posts each user has voted on
    votes_by_user = {user.id: set() for user in users}

    # Seed votes for each post
    for post in posts:
        # Decide whether to seed more upvotes or downvotes for this post
        if fake.random.choices([True, False], weights=[0.9, 0.1])[0]:
            more_upvotes = True
            num_upvotes = fake.random_int(min=20, max=50)
            num_downvotes = fake.random_int(min=10, max=30)
        else:
            more_upvotes = False
            num_upvotes = fake.random_int(min=10, max=30)
            num_downvotes = fake.random_int(min=20, max=50)

        # Seed votes for this post
        for i in range(num_upvotes):
            # Choose a random user who hasn't voted on this post yet
            user = fake.random.choice(users)
            while post.id in votes_by_user[user.id]:
                user = fake.random.choice(users)

            # Create an upvote and add it to the session
            vote = Vote(user=user, post=post, type='upvote')
            db.session.add(vote)

            # Update the votes_by_user dictionary
            votes_by_user[user.id].add(post.id)

        for i in range(num_downvotes):
            # Choose a random user who hasn't voted on this post yet
            user = fake.random.choice(users)
            while post.id in votes_by_user[user.id]:
                user = fake.random.choice(users)

            # Create a downvote and add it to the session
            vote = Vote(user=user, post=post, type='downvote')
            db.session.add(vote)

            # Update the votes_by_user dictionary
            votes_by_user[user.id].add(post.id)

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
