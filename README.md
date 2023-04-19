# threadit

Threadit is a web application inspired by Reddit that allows users to share and discuss content through the creation of posts and comments in various threads. This project aims to replicate the popular layout of Reddit and go a step further by making the UI/UX easier for new users to navigate. Threadit is built with a Python/Flask backend and React/Redux frontend for responsiveness.

## Features

* User authentication: users can sign up, log in, log out, and use a demo login to try the site
* Subreddits: users can create and browse subreddits
* Posts: users can create, view, edit, and delete posts in subreddits
* Comments: users can create, view, edit, and delete comments on posts
* Voting: users can upvote or downvote posts and comments

## Schema

The following schema is used for the Threadit database:

![threadit-schema](https://user-images.githubusercontent.com/47682357/226485111-7e33a332-bbf0-4115-b14c-a353e3a021eb.png)

## Backend Routes

### Users
* GET /api/users/:id
* POST /api/auth/signup
* POST /api/auth/login
* DELETE /api/auth/logout

### Subreddits
* GET /api/subreddits/
* GET /api/subreddits/:id
* POST /api/subreddits/
* PUT /api/subreddits/:id
* DELETE /api/subreddits/:id

### Posts
* GET /api/posts/
* GET /api/posts/:id
* POST /api/posts/
* PUT /api/posts/:id
* DELETE /api/posts/:id

### Comments
* GET /api/comments/
* GET /api/comments/:id
* POST /api/comments/
* PUT /api/comments/:id
* DELETE /api/comments/:id

### Votes
* POST /api/votes/

## Styling Choices

* Font Family: Google Fonts "Roboto", "Helvetica", "Arial", sans-serif
* Primary Color: #FF4500 (Reddit Orange)
* Secondary Color: #1A1A1B (Reddit Black)
* Button Color: #FF4500
* Button Hover Color: #FF5800
* Input Background Color: #F5F5F5
* Input Border Color: #D3D3D3


## Conclusion
threadit aims to provide users with a platform to share and discuss content in a manner similar to Reddit, while also showcasing skills in web development using Python-Flask and React.
