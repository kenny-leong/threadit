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
        more_upvotes = choice([True, False])
        num_votes = fake.random_int(min=10, max=50)

        # Seed votes for this post
        for i in range(num_votes):
            # Choose a random user who hasn't voted on this post yet
            user = choice(users)
            while post.id in votes_by_user[user.id]:
                user = choice(users)

            # Decide whether to upvote or downvote
            if more_upvotes:
                vote_type = choice(['upvote', 'upvote', 'downvote'])
            else:
                vote_type = choice(['downvote', 'downvote', 'upvote'])

            # Create the vote and add it to the session
            vote = Vote(user=user, post=post, type=vote_type)
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
