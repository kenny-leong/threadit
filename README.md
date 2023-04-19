# threadit

Threadit is a web application inspired by Reddit that allows users to share and discuss content through the creation of posts and comments in various threads. This project aims to replicate the popular layout of Reddit and go a step further by making the UI/UX easier for new users to navigate. Threadit is built with a Python/Flask backend and React/Redux frontend for responsiveness.


[Click here to view threadit's Live Site](https://threadit.onrender.com/)



## Technologies Used:

* JavaScript
* PostgreSQL
* Flask
* Python
* React
* Redux
* HTML
* CSS
* Alembic
* SQLAlchemy
* Werkzeug
* Render (deployment)



# Features

## Demo User Implementation:

* Feel free to test the site features through clicking the "Demo User" button which will directly log you in




## Sign up a User:

* You will be able to sign up and automatically be redirected to the logged in page
* There are validations for signing up such as username length requirements, valid email address, password length, etc
* Passwords must be matching when entered twice or the signup button will be disabled
* Friendly reminders will display and signup will be blocked if fields are not properly filled out



## User Login and Authentication:

* You are able to login as long as your credentials are stored within the database (hashed)
* If there are no matching credentials an error message is displayed
* Login button is disabled if there are null fields or if the amount of characters entered is not within the acceptable range



## View Posts:

* Users can view posts regardless of whether they are logged in or not
* Users can view the comments underneath the post


## View Subreddits

* Users can view and browse different subreddits regardless of whether they are logged in
* Users are unable to post in subreddits unless they are logged in


* Posts: users can create, view, edit, and delete posts in subreddits
* Comments: users can create, view, edit, and delete comments on posts
* Voting: users can upvote or downvote posts and comments

## Schema

The following schema is used for the Threadit database:

![threadit-schema](https://user-images.githubusercontent.com/47682357/226485111-7e33a332-bbf0-4115-b14c-a353e3a021eb.png)




## Conclusion
threadit aims to provide users with a platform to share and discuss content in a manner similar to Reddit, while also showcasing skills in web development using Python-Flask and React.
