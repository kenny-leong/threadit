from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Subreddit, Post, db

post_routes = Blueprint('posts', __name__)

@post_routes.route('')
def posts():
    """
    Query for all posts and returns them in a list of post dictionaries
    """
    posts = Post.query.all()
    return {'posts': [post.to_dict() for post in posts]}


@post_routes.route('', methods=['POST'])
@login_required
def create_post():
    """
    Create a new post with the current user as the author
    """
    data = request.get_json()
    subreddit_id = data.get('subreddit_id')
    subreddit = Subreddit.query.get(subreddit_id)
    if not subreddit:
        return jsonify(message='Invalid subreddit'), 400
    post = Post(title=data['title'], content=data['content'], image_url=data['image_url'],subreddit=subreddit, author=current_user)
    db.session.add(post)
    db.session.commit()
    return post.to_dict()

@post_routes.route('/<int:id>/comments')
def post_comments(id):
    """
    Query for all comments of a post by id and returns them in a list of comment dictionaries
    """
    post = Post.query.get(id)
    if not post:
        return jsonify(message='Post not found'), 404
    comments = post.comments
    return {'comments': [comment.to_dict() for comment in comments]}

@post_routes.route('/<int:id>')
def post(id):
    """
    Query for a post by id and returns that post in a dictionary
    """
    post = Post.query.get(id)
    return post.to_dict()


@post_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_post(id):
    """
    Update an existing post that belongs to the current user
    """
    post = Post.query.get(id)
    if not post:
        return jsonify(message='Post not found'), 404
    if post.author != current_user:
        return jsonify(message='You cannot edit this post'), 403
    data = request.get_json()
    post.title = data['title']
    post.content = data['content']
    post.image_url = data['image_url']
    db.session.commit()
    return post.to_dict()

@post_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_post(id):
    """
    Delete an existing post that belongs to the current user
    """
    post = Post.query.get(id)
    if not post:
        return jsonify(message='Post not found'), 404
    if post.author != current_user:
        return jsonify(message='You cannot delete this post'), 403
    db.session.delete(post)
    db.session.commit()
    return jsonify(message='Post deleted')
