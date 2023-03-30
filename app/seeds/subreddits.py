from app.models import db, User, Subreddit, SubredditMember, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint

# Adds a demo subreddit, you can add other subreddits here if you want
def seed_subreddits():
    subreddits = [
        Subreddit(name='AskThreadit', description='Ask and answer questions', profile_picture='https://c4.wallpaperflare.com/wallpaper/560/855/635/spy-x-family-anya-forger-hd-wallpaper-preview.jpg'),
        Subreddit(name='aww', description='Cute and cuddly animals', profile_picture='https://play-lh.googleusercontent.com/XVHP0sBKrRJYZq_dB1RalwSmx5TcYYRRfYMFO18jgNAnxHAIA1osxM55XHYTb3LpkV8'),
        Subreddit(name='todayilearned', description='Learn something new every day'),
        Subreddit(name='worldnews', description='News from around the world'),
        Subreddit(name='funny', description='Funny memes and jokes'),
        Subreddit(name='news', description='Current events'),
        Subreddit(name='programming', description='Programming and software development'),
        Subreddit(name='NFL', description='This is a subreddit for the NFL community.', profile_picture='https://www.profootballnetwork.com/wp-content/uploads/2021/02/nfl-logo-shield-history-design-meaning.jpg'),
        Subreddit(name='NBA', description='A subreddit dedicated to NBA news and discussion.', profile_picture='https://www.logodesignlove.com/images/classic/nba-logo.jpg'),
        Subreddit(name='worldcup', description='All Things 2022 World Cup and Beyond: Match Threads, News, Discussions and More!', profile_picture='https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf15991fe3eb6a383/61604c51dbc6881160d975c2/64f745eda5443a977a33b130a3d22d7abe0b1cac.jpg'),
        Subreddit(name='Robinhood', description='Welcome to the machine!', profile_picture='https://upload.wikimedia.org/wikipedia/commons/b/b9/Robinhood_Logo.png', banner_image='https://i0.wp.com/blocktalk.co/wp-content/uploads/sites/12/2021/01/robinhood-banner.png?resize=1200%2C628&ssl=1'),
        Subreddit(name='goldmansachs', description='Welcome to goldman sachs.', profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png'),
        Subreddit(name='Bloomberg', description='The Bloomberg Reddit: Anything related to Bloomberg Terminal.', profile_picture='https://e7.pngegg.com/pngimages/405/172/png-clipart-bloomberg-terminal-bloomberg-markets-bloomberg-television-bloomberg-businessweek-others-miscellaneous-purple.png', banner_image='https://assets.bwbx.io/s3/multimedia/public/app/images/bloomberg_default-a4f15fa7ee.jpg'),
        Subreddit(name='bitcoin', description='Bitcoin is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, bitcoins are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Bitcoin. As such, it is more resistant to wild inflation and corrupt banks. With Bitcoin, you can be your own bank.', profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'),
        Subreddit(name='ethereum', description='Next-generation platform for decentralised applications. Dive in at ethereum.org', profile_picture='https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg'),
        Subreddit(name='dogecoin', description='The most amazing place on reddit! A subreddit for sharing, discussing, hoarding and wow-ing about Dogecoins. The much wow innovative crypto-currency.', profile_picture='https://static.wikia.nocookie.net/dogecoin/images/c/c9/Logo.png/revision/latest?cb=20180917222934'),
        Subreddit(name='SuzumeNoTojimari', description='"Suzume no Tojimari" (すずめの戸締まり) directed by Makoto Shinkai. Theatrical release in Japan November 11, 2022', profile_picture='https://i.ytimg.com/vi/qal34e9v_pk/maxresdefault.jpg', banner_image='https://variety.com/wp-content/uploads/2023/02/Suzume-1.jpg?w=681&h=383&crop=1'),
        Subreddit(name='kimetsu_no_yaiba', description='A community dedicated to Demon Slayer: Kimetsu no Yaiba, a manga and anime series written by Koyoharu Gotōge and produced by Ufotable.', profile_picture='https://sportshub.cbsistatic.com/i/2021/10/08/ac368aaa-5b41-45c8-9644-f816b8dd1809/demon-slayer-season-2-rengoku.jpg', banner_image='https://mmos.com/wp-content/uploads/2021/10/demon-slayer-the-hinokami-chronicles-tanjiro-water-sword-banner.jpg'),
        Subreddit(name='JujutsuKaisen', description='r/JujutsuKaisen is a subreddit dedicated to the ongoing manga and anime series "Jujutsu Kaisen" written and illustrated by Gege Akutami, and animated by MAPPA. Check out our sister sub r/Jujutsushi for serious manga discussion.', profile_picture='https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/gojo2.jpg', banner_image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe736b76-1597-4d7d-af41-ec69ae475a22/df1nn40-450d18d5-6b19-4c00-bbc4-4570995a14c6.png/v1/fill/w_1280,h_427,q_80,strp/jujutsu_kaisen_banner_by_noturmads_df1nn40-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDI3IiwicGF0aCI6IlwvZlwvZmU3MzZiNzYtMTU5Ny00ZDdkLWFmNDEtZWM2OWFlNDc1YTIyXC9kZjFubjQwLTQ1MGQxOGQ1LTZiMTktNGMwMC1iYmM0LTQ1NzA5OTVhMTRjNi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.iyn9LJskOWORzgZuzVCnEyM64QPgxNfp-LDcmtdnKyQ'),
        Subreddit(name='KimKardashian', description='Kim Kardashian is an American media personality, socialite, model, and businesswoman.Over the years, Kim has built a successful brand with various business ventures, including her own makeup line, fragrances, and shapewear. She has also been involved in various philanthropic endeavors and is known for her influential presence on social media.', profile_picture='https://cdn.rt.emap.com/wp-content/uploads/sites/2/2022/01/24101656/10-Kim-Kardashians-1024x683.jpg', banner_image='https://www.hungertv.com/app/uploads/2022/05/kim-k-banner.jpg'),
        Subreddit(name='ITZY', description='A community for fan of ITZY, a K-pop girl group featuring Yeji, Lia, Ryujin, Chaeryeong, and Yuna on JYP Entertainment. ITZY released "CHESHIRE" on November 30 and will be continuing their world tour through 2023!', profile_picture='https://www.billboard.com/wp-content/uploads/2022/07/itzy-press-Courtesy-of-JYP-Entertainment-2022-billboard-2-1548.jpg', banner_image='https://i.pinimg.com/originals/03/83/ac/0383acd494d7c4454decdd18883bfbbb.jpg'),
        Subreddit(name='BlackPink', description='BLACKPINK / 블랙핑크 (stylized as BLΛƆKPIИK) is a four-member K-pop girl group by YG Entertainment, consisting of members Jisoo, Jennie, Rosé, and Lisa. The group debuted on August 8th, 2016. BLACKPINK is represented by Interscope and Universal Music Group outside of Asia.', profile_picture='https://i.pinimg.com/originals/00/5b/36/005b36c78f2ba0585416fccd55d58439.jpg', banner_image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7078577-b42f-46ae-aef9-002c5111a48b/dfbnkqh-5dbeb2e1-d5be-4887-8b27-eb58cffa47ac.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M3MDc4NTc3LWI0MmYtNDZhZS1hZWY5LTAwMmM1MTExYTQ4YlwvZGZibmtxaC01ZGJlYjJlMS1kNWJlLTQ4ODctOGIyNy1lYjU4Y2ZmYTQ3YWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Oout41KPGDsndFkUJ69rBNlLvLMDMz3G4tEb2Gqw56M'),
        Subreddit(name='maplestory', description='MapleStory is a massively multiplayer online role-playing game (MMORPG) developed by the South Korean company Nexon.', profile_picture='https://e7.pngegg.com/pngimages/614/726/png-clipart-maplestory-2-maple-leaf-leaf-game-maple.png', banner_image='https://nxcache.nexon.net/cms/2021/q1/2166/community-news-assets-in-post-banner-1100x225-maplestory.jpg'),
        Subreddit(name='Genshin_Impact', description='This is the official community for Genshin Impact (原神), the latest open-world action RPG from HoYoverse. The game features a massive, gorgeous map, an elaborate elemental combat system, engaging storyline & characters, co-op game mode, soothing soundtrack, and much more for you to explore!', profile_picture='https://logowik.com/content/uploads/images/genshin-impact4958.jpg', banner_image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmBrBOA19SRyHh4WpI7aSJ6gh2I_BlYN_GLw&usqp=CAU'),
        Subreddit(name='VALORANT', description='VALORANT™ is a free to play 5v5, character-based tactical shooter by Riot Games.', profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Valorant_logo_-_pink_color_version.svg/2560px-Valorant_logo_-_pink_color_version.svg.png', banner_image='https://mmos.com/wp-content/uploads/2021/06/valorant-heroes-grayscale-banner.jpg'),
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

        # Add additional members to the subreddit
        num_members = randint(10, 100)
        member_user_ids = [creator.id]
        for i in range(num_members - 1):
            user_id = users[randint(0, len(users) - 1)].id
            if user_id not in member_user_ids:
                member_user_ids.append(user_id)
                member = SubredditMember(user_id=user_id, subreddit_id=subreddit.id)
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
