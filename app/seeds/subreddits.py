from app.models import db, User, Subreddit, SubredditMember, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime
from random import randint

# Adds a demo subreddit, you can add other subreddits here if you want
def seed_subreddits():
    subreddits = [
        Subreddit(name='AskThreadit', description='Ask and answer questions', profile_picture='https://c4.wallpaperflare.com/wallpaper/560/855/635/spy-x-family-anya-forger-hd-wallpaper-preview.jpg'),
        Subreddit(name='aww', description='Cute and cuddly animals', profile_picture='https://play-lh.googleusercontent.com/XVHP0sBKrRJYZq_dB1RalwSmx5TcYYRRfYMFO18jgNAnxHAIA1osxM55XHYTb3LpkV8'),
        Subreddit(name='todayilearned', description='Learn something new every day', profile_picture='https://www.wiley.com/learn/jossey-bass/images/what-every-teacher-should-know-about-the-science-of-learning.jpg'),
        Subreddit(name='worldnews', description='News from around the world', profile_picture='https://timesofindia.indiatimes.com/thumb/msid-98553671,width-1200,height-900,resizemode-4/98553671.jpg'),
        Subreddit(name='funny', description='Funny memes and jokes', profile_picture='https://png.pngitem.com/pimgs/s/47-474412_funny-clipart-emoji-funny-emoji-png-transparent-png.png'),
        Subreddit(name='news', description='Current events'),
        Subreddit(name='programming', description='Programming and software development', profile_picture='https://www.freecodecamp.org/news/content/images/2022/12/main-image.png'),
        Subreddit(name='NFL', description='This is a subreddit for the NFL community.', banner_image='https://wwwimage-us.pplusstatic.com/base/files/blog/nflquizheaderimage.jpeg',profile_picture='https://www.profootballnetwork.com/wp-content/uploads/2021/02/nfl-logo-shield-history-design-meaning.jpg'),
        Subreddit(name='NBA', description='A subreddit dedicated to NBA news and discussion.', banner_image='https://sports.cbsimg.net/images/visual/whatshot/lebron_banner.jpg',profile_picture='https://www.logodesignlove.com/images/classic/nba-logo.jpg'),
        Subreddit(name='worldcup', description='All Things 2022 World Cup and Beyond: Match Threads, News, Discussions and More!', banner_image='https://ichef.bbci.co.uk/news/640/cpsprodpb/a617/live/4c8ad930-65d9-11ed-a6af-4f332dcec329.jpg',profile_picture='https://assets.goal.com/v3/assets/bltcc7a7ffd2fbf71f5/bltf15991fe3eb6a383/61604c51dbc6881160d975c2/64f745eda5443a977a33b130a3d22d7abe0b1cac.jpg'),
        Subreddit(name='Robinhood', description='Welcome to the machine!', profile_picture='https://upload.wikimedia.org/wikipedia/commons/b/b9/Robinhood_Logo.png', banner_image='https://i0.wp.com/blocktalk.co/wp-content/uploads/sites/12/2021/01/robinhood-banner.png?resize=1200%2C628&ssl=1'),
        Subreddit(name='goldmansachs', description='Welcome to goldman sachs.', banner_image='https://carboncredits.b-cdn.net/wp-content/uploads/2023/01/goldman-sachs-climate-fund.jpg',profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png'),
        Subreddit(name='Bloomberg', description='The Bloomberg Reddit: Anything related to Bloomberg Terminal.', profile_picture='https://e7.pngegg.com/pngimages/405/172/png-clipart-bloomberg-terminal-bloomberg-markets-bloomberg-television-bloomberg-businessweek-others-miscellaneous-purple.png', banner_image='https://assets.bwbx.io/s3/multimedia/public/app/images/bloomberg_default-a4f15fa7ee.jpg'),
        Subreddit(name='bitcoin', description='Bitcoin is the currency of the Internet: a distributed, worldwide, decentralized digital money. Unlike traditional currencies such as dollars, bitcoins are issued and managed without any central authority whatsoever: there is no government, company, or bank in charge of Bitcoin.', banner_image='https://img.freepik.com/premium-vector/bitcoin-cryptocurrency-with-candlestick-price-pattern-digital-coin-btc-technology-banner-website-presentation-futuristic-business-concept-blockchain-graphic-design-vector_185386-949.jpg?w=2000',profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png'),
        Subreddit(name='ethereum', description='Next-generation platform for decentralised applications. Dive in at ethereum.org', banner_image='https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX30316391.jpg',profile_picture='https://d33wubrfki0l68.cloudfront.net/fcd4ecd90386aeb50a235ddc4f0063cfbb8a7b66/4295e/static/bfc04ac72981166c740b189463e1f74c/40129/eth-diamond-black-white.jpg'),
        Subreddit(name='dogecoin', description='The most amazing place on reddit! A subreddit for sharing, discussing, hoarding and wow-ing about Dogecoins. The much wow innovative crypto-currency.', banner_image='https://img.pikbest.com/backgrounds/20190621/cute-adorable-puppy-dog-shiba-inu-cartoon-doodle-seamless-pattern-wallpaper-cover-banner-v_1426004jpg!bw700',profile_picture='https://zycrypto.com/wp-content/uploads/2022/11/Dogecoins-Future-Could-Follow-This-Bullish-Trajectory-To-1-DOGE-Price-Thanks-To-Elon-Musk.jpg'),
        Subreddit(name='SuzumeNoTojimari', description='"Suzume no Tojimari" (すずめの戸締まり) directed by Makoto Shinkai. Theatrical release in Japan November 11, 2022', profile_picture='https://i.redd.it/uwjcvbgkfp581.jpg', banner_image='https://cdnb.artstation.com/p/assets/images/images/048/735/525/large/meng-low-suzume-02.jpg?1650813226'),
        Subreddit(name='kimetsu_no_yaiba', description='A community dedicated to Demon Slayer: Kimetsu no Yaiba, a manga and anime series written by Koyoharu Gotōge and produced by Ufotable.', profile_picture='https://1000logos.net/wp-content/uploads/2022/06/Demon-Slayer-Logo.png', banner_image='https://wallpapercave.com/wp/wp4741022.png'),
        Subreddit(name='JujutsuKaisen', description='r/JujutsuKaisen is a subreddit dedicated to the ongoing manga and anime series "Jujutsu Kaisen" written and illustrated by Gege Akutami, and animated by MAPPA. Check out our sister sub r/Jujutsushi for serious manga discussion.', profile_picture='https://static1.cbrimages.com/wordpress/wp-content/uploads/2022/06/gojo2.jpg', banner_image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/fe736b76-1597-4d7d-af41-ec69ae475a22/df1nn40-450d18d5-6b19-4c00-bbc4-4570995a14c6.png/v1/fill/w_1280,h_427,q_80,strp/jujutsu_kaisen_banner_by_noturmads_df1nn40-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDI3IiwicGF0aCI6IlwvZlwvZmU3MzZiNzYtMTU5Ny00ZDdkLWFmNDEtZWM2OWFlNDc1YTIyXC9kZjFubjQwLTQ1MGQxOGQ1LTZiMTktNGMwMC1iYmM0LTQ1NzA5OTVhMTRjNi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.iyn9LJskOWORzgZuzVCnEyM64QPgxNfp-LDcmtdnKyQ'),
        Subreddit(name='KimKardashian', description='Kim Kardashian is an American media personality, socialite, model, and businesswoman.Over the years, Kim has built a successful brand with various business ventures, including her own makeup line, fragrances, and shapewear. She has also been involved in various philanthropic endeavors and is known for her influential presence on social media.', profile_picture='https://cdn.rt.emap.com/wp-content/uploads/sites/2/2022/01/24101656/10-Kim-Kardashians-1024x683.jpg', banner_image='https://www.hungertv.com/app/uploads/2022/05/kim-k-banner.jpg'),
        Subreddit(name='ITZY', description='A community for fan of ITZY, a K-pop girl group featuring Yeji, Lia, Ryujin, Chaeryeong, and Yuna on JYP Entertainment. ITZY released "CHESHIRE" on November 30 and will be continuing their world tour through 2023!', profile_picture='https://www.billboard.com/wp-content/uploads/2022/07/itzy-press-Courtesy-of-JYP-Entertainment-2022-billboard-2-1548.jpg', banner_image='https://i.pinimg.com/originals/03/83/ac/0383acd494d7c4454decdd18883bfbbb.jpg'),
        Subreddit(name='BlackPink', description='BLACKPINK / 블랙핑크 (stylized as BLΛƆKPIИK) is a four-member K-pop girl group by YG Entertainment, consisting of members Jisoo, Jennie, Rosé, and Lisa. The group debuted on August 8th, 2016. BLACKPINK is represented by Interscope and Universal Music Group outside of Asia.', profile_picture='https://i.pinimg.com/originals/00/5b/36/005b36c78f2ba0585416fccd55d58439.jpg', banner_image='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c7078577-b42f-46ae-aef9-002c5111a48b/dfbnkqh-5dbeb2e1-d5be-4887-8b27-eb58cffa47ac.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2M3MDc4NTc3LWI0MmYtNDZhZS1hZWY5LTAwMmM1MTExYTQ4YlwvZGZibmtxaC01ZGJlYjJlMS1kNWJlLTQ4ODctOGIyNy1lYjU4Y2ZmYTQ3YWMuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Oout41KPGDsndFkUJ69rBNlLvLMDMz3G4tEb2Gqw56M'),
        Subreddit(name='maplestory', description='MapleStory is a massively multiplayer online role-playing game (MMORPG) developed by the South Korean company Nexon.', profile_picture='https://ih1.redbubble.net/image.1982703354.0403/flat,750x1000,075,f.jpg', banner_image='https://nxcache.nexon.net/maplestory/assets-new/img/website_preview_1200x630.jpg'),
        Subreddit(name='Genshin_Impact', description='This is the official community for Genshin Impact (原神), the latest open-world action RPG from HoYoverse. The game features a massive, gorgeous map, an elaborate elemental combat system, engaging storyline & characters, co-op game mode, soothing soundtrack, and much more for you to explore!', profile_picture='https://i.pinimg.com/originals/bb/55/3d/bb553d7a57b0142167c6aef4c33c7f30.jpg', banner_image='https://www.pcgamesn.com/wp-content/sites/pcgamesn/2022/11/genshin-impact-tier-list-characters-header.jpg'),
        Subreddit(name='VALORANT', description='VALORANT™ is a free to play 5v5, character-based tactical shooter by Riot Games.', profile_picture='https://static.vecteezy.com/system/resources/previews/019/763/094/original/valorant-icon-logo-free-vector.jpg', banner_image='https://mmos.com/wp-content/uploads/2021/06/valorant-heroes-grayscale-banner.jpg'),
        Subreddit(name='sumikko_gurashi', description='Sumikko Gurashi (すみっコぐらし) is a set of fictional characters produced by the Japanese company San-X. The name roughly translates to "life in the corner".', profile_picture='https://pbs.twimg.com/profile_images/627114300025405440/SalN2Ium_400x400.jpg', banner_image='https://preview.redd.it/found-this-super-cute-picture-of-all-sumikko-gurashi-v0-xlexfiuvioz91.png?auto=webp&s=ba022547330a79ea4f9a4f82be923aed31020a47'),
        Subreddit(name='Japan', description='This subreddit serves as a general hub to discuss most things Japanese and exchange information as well as to guide users to subs specializing in things such as daily life, travel or language acquisition.', profile_picture='https://prod-virtuoso.dotcmscloud.com/dA/2a61b8d8-e554-46f3-9667-b0e66b732335/heroImage1/1-Hirosaki-Castle_Aomori-1-01495029061R.jpg', banner_image='https://www.wowtravelclub.com/wp-content/uploads/2019/03/Japan-banner.jpg'),
        Subreddit(name='South_Korea', description='A community for discussions and content relating to the Republic of Korea.', profile_picture='https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Flag_of_South_Korea.svg/1200px-Flag_of_South_Korea.svg.png', banner_image='https://as2.ftcdn.net/v2/jpg/01/82/44/69/1000_F_182446959_IQ0h9gRjLET8tGTDCNaafIi6TSNHyCe6.jpg'),
        Subreddit(name='China', description='A community for discussing China and topics related to it. All viewpoints and opinions are welcome here but please refrain from inappropriate conduct.', profile_picture='https://t3.ftcdn.net/jpg/02/21/18/66/360_F_221186652_6vlR6r0UvP51bUENSTL27DTrlIfT3cZ0.jpg', banner_image='https://free4kwallpapers.com/uploads/originals/2020/05/05/china-wallpaper.jpg'),
        Subreddit(name='Thailand', description='The home of Thailand on Reddit.', profile_picture='https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/44e1d075946965.5c5df74926db3.png', banner_image='https://thumbs.dreamstime.com/b/landmark-thailand-gradient-travel-thailand-bangkok-text-banner-modern-idea-concept-landmark-thailand-gradient-travel-thailand-190294259.jpg'),
        Subreddit(name='bodybuilding', description='News, articles, personal pictures, videos & advice on everything related to bodybuilding - nutrition, supplementation, training, contest preparation, and more.', profile_picture='https://www.fortressofsolitude.co.za/wp-content/uploads/2022/01/Baki-Hanma-%E2%80%93-Baki-the-Grappler-Buff-Anime-Characters-770x433.jpeg', banner_image='https://t4.ftcdn.net/jpg/03/50/81/89/360_F_350818949_lJTfzSTDr79e9Kn55PUVZjN19ct20uGc.jpg'),
        Subreddit(name='vegan', description='Veganism: "A philosophy and way of living which seeks to exclude—as far as is possible and practicable—all forms of exploitation of, and cruelty to, animals for food, clothing or any other purpose; and by extension, promotes the development and use of animal-free alternatives for the benefit of animals, humans and the environment. In dietary terms it denotes the practice of dispensing with all products derived wholly or partly from animals." - The Vegan Society', profile_picture='https://static.vecteezy.com/system/resources/previews/002/300/792/original/vegan-icon-bio-ecology-organic-logos-label-tag-green-leaf-free-vector.jpg', banner_image='https://thumbs.dreamstime.com/b/vegan-banner-tamplate-food-icon-178675083.jpg'),
        Subreddit(name='crossfit', description='This SubReddit is for discussion of CrossFit, functional fitness, weightlifting and the lifestyle, nutrition and training methodologies involved.', profile_picture='https://www.crossfit.com/5.5.2/crossfit-og-fallback.c0d4454b.jpg', banner_image='https://valoursports.in/wp-content/uploads/2019/11/crossfit-fitness-training-pune-baner-valour-sports.jpg'),
        Subreddit(name='MakeupAddiction', description='The subreddit for everything makeup related.', profile_picture='https://i.etsystatic.com/21843402/c/625/496/200/256/il/3ce369/4392594455/il_340x270.4392594455_r541.jpg', banner_image='https://joahbox.com/wp-content/uploads/k-makeup-look-banner.jpg'),
        Subreddit(name='LouisVuitton', description='The first and only subreddit dedicated to all things Louis Vuitton. Come chat with us!', profile_picture='https://www.vectorkhazana.com/assets/images/products/Louis-Vuitton-Logo-Flower.jpg', banner_image='https://wallpapers.com/images/hd/louis-vuitton-wallpaper-4o78xub2h7sacp5k.jpg'),
        Subreddit(name='dior', description='The only subreddit dedicated to all things Christian Dior', profile_picture='https://logowik.com/content/uploads/images/christian-dior-new3874.jpg', banner_image='https://images.hdqwalls.com/download/jennifer-lawrence-dior-2017-v7-2048x1152.jpg'),
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
