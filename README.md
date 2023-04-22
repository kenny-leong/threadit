# threadit

Threadit is a web application inspired by Reddit that allows users to share and discuss content through the creation of posts and comments in various threads. This project aims to replicate the popular layout of Reddit and go a step further by making the UI/UX easier for new users to navigate. Threadit is built with a Python/Flask backend and React/Redux frontend for responsiveness.


[Click here to view threadit's Live Site](https://threadit.onrender.com/)



## Technologies/Frameworks Used:

![Screenshot 2023-04-22 at 1 23 42 PM](https://user-images.githubusercontent.com/47682357/233798130-279c3564-36e4-4432-a932-49bfd3eef84d.png)


# Features

## Demo User Implementation:

* Feel free to test the site features through clicking the "Demo User" button which will directly log you in

![demo_login](https://user-images.githubusercontent.com/47682357/233462153-00666f1a-0ff6-4618-80b0-9233567d6aa6.gif)




## Sign up a User:

* You will be able to sign up and automatically be redirected to the logged in page
* There are validations for signing up such as username length requirements, valid email address, password length, etc
* Passwords must be matching when entered twice or the signup button will be disabled
* Friendly reminders will display and signup will be blocked if fields are not properly filled out

![signup-user](https://user-images.githubusercontent.com/47682357/233459468-02d7c562-b386-4cda-b1dd-1aef456caadc.gif)



## User Login and Authentication:

* You are able to login as long as your credentials are stored within the database (hashed)
* If there are no matching credentials an error message is displayed
* Login button is disabled if there are null fields or if the amount of characters entered is not within the acceptable range

![login](https://user-images.githubusercontent.com/47682357/233544861-9e3649a6-94d7-4540-89d0-67f332bca4cc.gif)


## Search Bar

* Users are able to use the search bar to search through subreddits without being logged in
* There is a list of results that populates when using the search bar

![search-bar](https://user-images.githubusercontent.com/47682357/233545041-0a13a0cd-9e34-428b-8ce5-afe7966e2a2c.gif)


## View Joined Communities

* Logged in users can view all the joined communities they have joined and leave them if they want

![my-communities](https://user-images.githubusercontent.com/47682357/233545504-d3a804bb-78dc-4725-b130-0ae4bb8b489d.gif)


## View Owned Subreddits

* Logged in users can view the subreddit they have created and update or delete them

![owner-section](https://user-images.githubusercontent.com/47682357/233545814-3524e324-4673-4f99-8bbe-2c40cf741b28.gif)


## Create/Update a Post:

* Logged in users can create a post of three different types (Text, Image, and Link)
* Users are able to see their post in the main feed and within the subreddit page
* Users are able to edit their own posts and swap the type of post

![create-post](https://user-images.githubusercontent.com/47682357/233798889-ca098582-ce9d-47ec-9282-e7b66484f035.gif)


## Create/Update a Vote

* Users can vote on a post as long as they have joined the subreddit the post belongs to
* Users can update or delete a vote by either toggling it (pressing their existing vote again) or by changing the vote type (upvote -> downvote)

![vote-system](https://user-images.githubusercontent.com/47682357/233799019-4469894c-c0ca-4a44-9ec5-3fdd2845a3c9.gif)


## Create/Update a Comment

* Users can comment under a post if they have joined the subreddit the post belongs to
* Users can edit their comments as long it belongs to the user


## View Posts:

* Users can view posts regardless of whether they are logged in or not
* Users can view the comments underneath the post



## View Subreddits

* Users can view and browse different subreddits regardless of whether they are logged in
* Users are unable to post in subreddits unless they are logged in
* Subreddits will automatically be generated with a creation date and display the number of members



## Create/Update Subreddit

* Users can create a subreddit as long as the subreddit name is not already taken
* Users can update their subreddit with a description, banner picture, and profile picture



## View Comments

* Users can view comments under a post regardless of if there is a logged in user or not
* Users are unable to post a comment unless they are logged in


## View Votes

* Users can view the net votes (upvotes - downvotes) of a post or comment without being logged in
* If a user has already voted on a post, there will be a glow effect on the type of vote they have submitted
* Users may not upvote or downvote on a post or comment unless they are logged in






## Schema

The following schema is used for the Threadit database:

![threadit-schema](https://user-images.githubusercontent.com/47682357/226485111-7e33a332-bbf0-4115-b14c-a353e3a021eb.png)



