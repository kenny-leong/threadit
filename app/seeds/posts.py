from app.models import db, User, Subreddit, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds seed data for posts
def seed_posts():
    users = User.query.all()
    subreddits = Subreddit.query.all()
    posts = [
        Post(title='What is the most valuable skill you have learned in the past year?', content='...', author=users[0], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='Whats the craziest conspiracy theory you have heard recently?', content='...', author=users[1], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='How to start a successful business from scratch', content='...', author=users[2], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='Tips for staying productive while working from home', content='...', author=users[3], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='The best budget-friendly recipes for college students', content='...', author=users[4], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='Whats your favorite hobby and why?', content='...', author=users[5], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='How to overcome procrastination and get things done', content='...', author=users[6], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='The truth about the stock market: Myths and misconceptions', content='...', author=users[0], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='How to build meaningful relationships in a digital age', content='...', author=users[1], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='What is the best advice you have ever received?', content='...', author=users[2], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='Why you should start meditating today: Benefits and techniques', content='...', author=users[3], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title="The impact of social media on mental health - what we know so far", content='...', author=users[4], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title="The future of space exploration - what's next for humanity?", content='...', author=users[5], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title="Discover the hidden gems of Japan's countryside", content='...', author=users[6], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='How to optimize your code', author=users[1], subreddit=subreddits[1], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBT-Wz76dPt9P4cgQWKivlxu0JmRWt-XNvQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='Interesting article about Python', author=users[2], subreddit=subreddits[1], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4gC8xkvp-odMTzHXrh9T32QFrSf5wDnPGQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='The future of artificial intelligence: What can we expect?', author=users[3], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcK5tjrpXAkkT1XTjkAxQhmDipkrlgPtsNQQ&usqp=CAU", subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='Whats your favorite book and why?', author=users[4], subreddit=subreddits[1], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEt8TfO7znM19ZgZM2lGTek_VligYe587SQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='Best travel destinations for adventure seekers', author=users[5], subreddit=subreddits[1], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeju03n7p4g8UVAECZhx2zY6ukEnHAhMOBA&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='The dark side of social media: How it affects mental health', author=users[6], subreddit=subreddits[0], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWdWWXf765QA-iOG_GHxeebI51QWS8T6BhQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='Genshin Impact addiction— Gamer spends $40,000 on gacha characters', author=users[0], image_url="https://assets.reedpopcdn.com/Genshin-Impact-beginner%E2%80%99s-guide-for-2023%2C-tips-and-tricks-cover.jpg/BROK/thumbnail/1200x1200/quality/100/Genshin-Impact-beginner%E2%80%99s-guide-for-2023%2C-tips-and-tricks-cover.jpg", subreddit=subreddits[0], created_at=datetime.utcnow()),
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
