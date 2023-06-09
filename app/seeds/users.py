from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
from faker import Faker




# Adds a demo user, you can add other users here if you want
def seed_users():

    fake = Faker()


    users = [
        User(username='Demo', email='demo@aa.io', password='password'),
        User(username='marnie', email='marnie@aa.io', password='password'),
        User(username='bobbie', email='bobbie@aa.io', password='password'),
        User(username='Kenny', email='kennyleong@gmail.com', password='password'),
        User(username='JohnDoe', email='johndoe@example.com', password='password'),
        User(username='JaneDoe', email='janedoe@example.com', password='password'),
        User(username='MarkSmith', email='marksmith@example.com', password='password'),
        User(username='ChrisL', email='chrisl@example.com', password='password'),
    ]

    # Generate 100 unique usernames and emails
    for i in range(100):
        username = fake.user_name()
        while User.query.filter_by(username=username).first() is not None:
            username = fake.user_name()
        email = fake.email()
        while User.query.filter_by(email=email).first() is not None:
            email = fake.email()
        password = 'password'
        users.append(User(username=username, email=email, password=password))




    db.session.add_all(users)
    db.session.commit()



# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.threadit_users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM threadit_users"))

    db.session.commit()
