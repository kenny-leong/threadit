from app.models import db, User, Subreddit, Post, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime

# Adds seed data for posts
def seed_posts():
    users = User.query.all()
    subreddits = Subreddit.query.all()
    posts = [
        Post(title='What is the most valuable skill you have learned in the past year?', content='I learned how to code in Python and it has opened up many doors for me in my career.', author=users[0], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='How to optimize your code', author=users[1], subreddit=subreddits[0], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBT-Wz76dPt9P4cgQWKivlxu0JmRWt-XNvQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='Interesting article about Python', author=users[2], subreddit=subreddits[1], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU4gC8xkvp-odMTzHXrh9T32QFrSf5wDnPGQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='Whats the craziest conspiracy theory you have heard recently?', content="I've heard that the earth is actually flat and that there's a massive conspiracy to keep this information hidden from the public.", author=users[1], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='How to start a successful business from scratch', content='Starting a business from scratch can be daunting, but it starts with identifying a problem and finding a solution that people are willing to pay for.', author=users[2], subreddit=subreddits[2], created_at=datetime.utcnow()),
        Post(title='Tips for staying productive while working from home', content='Working from home can be challenging, but creating a routine, setting boundaries, and taking breaks can help you stay focused and productive.', author=users[3], subreddit=subreddits[3], created_at=datetime.utcnow()),
        Post(title='The future of artificial intelligence: What can we expect?', author=users[3], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcK5tjrpXAkkT1XTjkAxQhmDipkrlgPtsNQQ&usqp=CAU", subreddit=subreddits[2], created_at=datetime.utcnow()),
        Post(title='Whats your favorite book and why?', author=users[4], subreddit=subreddits[3], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMEt8TfO7znM19ZgZM2lGTek_VligYe587SQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='The best budget-friendly recipes for college students', content='As a college student on a budget, I have found that rice, beans, and eggs are versatile and affordable ingredients that can be used to create many delicious meals.', author=users[4], subreddit=subreddits[4], created_at=datetime.utcnow()),
        Post(title='Whats your favorite hobby and why?', content='My favorite hobby is playing guitar because it allows me to express myself creatively and relax after a long day.', author=users[5], subreddit=subreddits[5], created_at=datetime.utcnow()),
        Post(title='How to overcome procrastination and get things done', content='Procrastination is a common problem, but breaking tasks into smaller, manageable steps and setting deadlines can help you overcome it and get things done.', author=users[6], subreddit=subreddits[6], created_at=datetime.utcnow()),
        Post(title='Best travel destinations for adventure seekers', author=users[5], subreddit=subreddits[4], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCeju03n7p4g8UVAECZhx2zY6ukEnHAhMOBA&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='The dark side of social media: How it affects mental health', author=users[6], subreddit=subreddits[5], image_url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKWdWWXf765QA-iOG_GHxeebI51QWS8T6BhQ&usqp=CAU", created_at=datetime.utcnow()),
        Post(title='The truth about the stock market: Myths and misconceptions', content='Many people believe that the stock market is a place to get rich quick, but in reality, it requires patience, discipline, and a long-term investment strategy.', author=users[0], subreddit=subreddits[0], created_at=datetime.utcnow()),
        Post(title='How to build meaningful relationships in a digital age', content='With the rise of social media and digital communication, building meaningful relationships requires intentional effort, such as scheduling regular phone calls or in-person meetings.', author=users[1], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='Genshin Impact addiction— Gamer spends $40,000 on gacha characters', author=users[0], image_url="https://assets.reedpopcdn.com/Genshin-Impact-beginner%E2%80%99s-guide-for-2023%2C-tips-and-tricks-cover.jpg/BROK/thumbnail/1200x1200/quality/100/Genshin-Impact-beginner%E2%80%99s-guide-for-2023%2C-tips-and-tricks-cover.jpg", subreddit=subreddits[23], created_at=datetime.utcnow()),
        Post(title='What is the best advice you have ever received?', content='The best advice I have ever received is to always keep learning and growing, both personally and professionally.', author=users[2], subreddit=subreddits[2], created_at=datetime.utcnow()),
        Post(title='Why you should start meditating today: Benefits and techniques', content='Meditation has been shown to reduce stress, improve focus and concentration, and promote overall well-being. Starting with just a few minutes a day can have a big impact on your mental and physical health.', author=users[3], subreddit=subreddits[3], created_at=datetime.utcnow()),
        Post(title="The impact of social media on mental health - what we know so far", content='Studies have shown that social media use can have both positive and negative effects on mental health, with excessive use being linked to increased anxiety, depression, and loneliness.', author=users[4], subreddit=subreddits[4], created_at=datetime.utcnow()),
        Post(title="The future of space exploration - what's next for humanity?", content='With advances in technology, space exploration is becoming more accessible than ever before. What does the future hold?', author=users[5], subreddit=subreddits[5], created_at=datetime.utcnow()),
        Post(title="Discover the hidden gems of Japan's countryside", content="If you're planning a trip to Japan, don't just stick to the cities! There are so many amazing things to see and do in the countryside. From hiking in the mountains to visiting traditional hot springs, there's something for everyone. Some of my favorite hidden gems include the ancient temple town of Nikko, the picturesque village of Shirakawa-go, and the stunning waterfalls of Nachi-Katsuura. Be sure to add some rural destinations to your itinerary and experience a different side of Japan!", author=users[6], subreddit=subreddits[6], created_at=datetime.utcnow()),
        Post(title='How Gen Z is getting cats to stave off loneliness and depression', content='With the rise of loneliness and depression among Gen Z, many are turning to furry companions to provide comfort and support. Cats, in particular, are a popular choice due to their low-maintenance nature and affectionate personalities. Studies have shown that owning a cat can have many mental health benefits, such as reducing stress and anxiety and increasing feelings of happiness and well-being.', author=users[0], subreddit=subreddits[1], created_at=datetime.utcnow()),
        Post(title='Exploring the World of MapleStory', content='MapleStory is a massively multiplayer online role-playing game that has captured the hearts of gamers around the world. With its charming graphics, engaging storyline, and addictive gameplay, MapleStory offers a unique and immersive gaming experience. Whether you are a seasoned player or a newbie, there is something for everyone in the world of MapleStory.', author=users[1], subreddit=subreddits[22], created_at=datetime.utcnow()),
        Post(title='Discovering the Magic of Suzume no Tojimari', content='Suzume no Tojimari is a beautifully animated movie that tells the story of a young girl who discovers a magical world hidden within her own imagination. With its stunning visuals, enchanting soundtrack, and heartfelt message, Suzume no Tojimari is a must-see for anyone who loves animation and fantasy.', author=users[2], subreddit=subreddits[16], created_at=datetime.utcnow()),
        Post(title='Inside the World of Software Engineers', content='Software engineers are the unsung heroes behind some of the most important technological advancements of our time. From creating cutting-edge apps and games to developing life-saving medical software, software engineers are responsible for shaping the world we live in. But what does it take to become a software engineer, and what does the day-to-day life of a software engineer look like? Join us as we explore the fascinating world of software engineering.', author=users[3], subreddit=subreddits[6], created_at=datetime.utcnow())


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
