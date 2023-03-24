from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Subreddit, Post, db

subreddit_routes = Blueprint('subreddits', __name__)

@subreddit_routes.route('')
def subreddits():
    """
    Query for all subreddits and returns them in a list of subreddit dictionaries
    """
    subreddits = Subreddit.query.all()
    return {'subreddits': [subreddit.to_dict() for subreddit in subreddits]}


@subreddit_routes.route('', methods=['POST'])
@login_required
def create_subreddit():
    """
    Create a new subreddit with the current user as the creator
    """
    data = request.get_json()
    subreddit = Subreddit(
        name=data['name'],
        description=data['description'],
        profile_picture=data['profile_picture'],
        banner_image=data['banner_image'],
        creator=current_user
    )
    db.session.add(subreddit)
    db.session.commit()
    return subreddit.to_dict()



@subreddit_routes.route('/<int:id>')
def subreddit(id):
    """
    Query for a subreddit by id and returns that subreddit in a dictionary
    """
    subreddit = Subreddit.query.get(id)
    return subreddit.to_dict()



@subreddit_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_subreddit(id):
    """
    Update an existing subreddit by id with the current user as the creator
    """
    subreddit = Subreddit.query.get(id)
    if not subreddit:
        return jsonify(message='Invalid subreddit'), 400

    data = request.get_json()
    subreddit.name = data.get('name', subreddit.name)
    subreddit.description = data.get('description', subreddit.description)
    subreddit.profile_picture = data.get('profile_picture', subreddit.profile_picture)
    subreddit.banner_image = data.get('banner_image', subreddit.banner_image)

    db.session.commit()
    return subreddit.to_dict()



@subreddit_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_subreddit(id):
    """
    Delete a subreddit by id
    """
    subreddit = Subreddit.query.get(id)
    if not subreddit:
        return jsonify(message='Subreddit not found'), 404
    if subreddit.creator != current_user:
        return jsonify(message='Unauthorized'), 401
    db.session.delete(subreddit)
    db.session.commit()
    return jsonify(message='Subreddit deleted'), 200




@subreddit_routes.route('/<int:id>/posts')
def subreddit_posts(id):
    """
    Query for all posts in a subreddit and returns them in a list of post dictionaries
    """
    posts = Post.query.filter_by(subreddit_id=id).all()
    return {'posts': [post.to_dict() for post in posts]}


@subreddit_routes.route('/<int:id>/create_post', methods=['POST'])
@login_required
def create_post_in_subreddit(id):
    """
    Create a new post in a subreddit with the current user as the author
    """
    data = request.get_json()
    subreddit = Subreddit.query.get(id)
    if not subreddit:
        return jsonify(message='Invalid subreddit'), 400
    post = Post(
        title=data['title'],
        content=data['content'],
        image_url=data['image_url'],
        subreddit=subreddit,
        author=current_user
    )
    db.session.add(post)
    db.session.commit()
    return post.to_dict()
