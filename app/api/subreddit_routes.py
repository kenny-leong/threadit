from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Subreddit, SubredditMember, Post, db

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
        creator=current_user
    )

    if 'description' in data:
        subreddit.description = data['description']

    if 'profile_picture' in data:
        subreddit.profile_picture = data['profile_picture']

    if 'banner_image' in data:
        subreddit.banner_image = data['banner_image']

    db.session.add(subreddit)

    subreddit_member = SubredditMember(
        user = current_user,
        subreddit = subreddit
    )

    db.session.add(subreddit_member)

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

    if 'description' in data:
        subreddit.description = data['description']

    if 'profile_picture' in data:
        subreddit.profile_picture = data['profile_picture']

    if 'banner_image' in data:
        subreddit.banner_image = data['banner_image']

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


@subreddit_routes.route('/creator/<int:user_id>')
@login_required
def subreddits_by_creator(user_id):
    """
    Query for all subreddits created by a specific user id and return them in a list of subreddit dictionaries
    """
    subreddits = Subreddit.query.filter_by(creator_id=user_id).all()
    return {'subreddits': [subreddit.to_dict() for subreddit in subreddits]}




@subreddit_routes.route('/<int:subredditId>/members')
@login_required
def get_subreddit_members(subredditId):
    """
    Query for all subreddit members by taking in a subredditId
    """
    subreddit_members = SubredditMember.query.filter_by(subreddit_id=subredditId).all()
    return {'subreddit_members': [member.to_dict() for member in subreddit_members]}


@subreddit_routes.route('/<int:subreddit_id>/members/<int:user_id>', methods=['DELETE'])
@login_required
def delete_subreddit_member(subreddit_id, user_id):
    """
    Delete a subreddit member by user_id and subreddit_id
    """
    member = SubredditMember.query.filter_by(user_id=user_id, subreddit_id=subreddit_id).first()
    if not member:
        return jsonify(message='Subreddit member not found'), 404
    if member.user != current_user:
        return jsonify(message='Unauthorized'), 401

    db.session.delete(member)
    db.session.commit()

    return jsonify(message='Subreddit member deleted'), 200


@subreddit_routes.route('/<int:id>/join', methods=['POST'])
@login_required
def join_subreddit(id):
    """
    Join a subreddit with the current user as a member
    """
    subreddit = Subreddit.query.get(id)
    if not subreddit:
        return jsonify(message='Invalid subreddit'), 400

    # Check if the user is already a member of the subreddit
    if SubredditMember.query.filter_by(user_id=current_user.id, subreddit_id=id).first():
        return jsonify(message='User is already a member of this subreddit'), 400

    # Create a new SubredditMember object and add it to the database
    member = SubredditMember(user_id=current_user.id, subreddit_id=id)
    db.session.add(member)
    db.session.commit()

    return jsonify(message='Subreddit joined successfully'), 200

@subreddit_routes.route('/member/<int:user_id>')
@login_required
def subreddits_by_member(user_id):
    """
    Query for all subreddits a user is a member of by user id and return them in a list of subreddit dictionaries
    """
    memberships = SubredditMember.query.filter_by(user_id=user_id).all()
    subreddits = [membership.subreddit.to_dict() for membership in memberships]
    return {'subreddits': subreddits}
