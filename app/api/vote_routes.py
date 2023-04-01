from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Comment, Post, Vote, db

vote_routes = Blueprint('votes', __name__)




@vote_routes.route('/posts/<int:post_id>/votes', methods=['POST'])
@login_required
def create_post_vote(post_id):
    """
    Creates a vote for a post and returns the updated vote count
    """
    data = request.json

    # Check if the required fields are present
    if not data.get('type'):
        return jsonify({'error': 'type not provided'}), 400

    # Check if the type is valid
    if data['type'] not in ('upvote', 'downvote'):
        return jsonify({'error': 'invalid type'}), 400

    # Check if the user has already voted on the post
    existing_vote = Vote.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    if existing_vote:
        return jsonify({'error': 'user has already voted on this post'}), 400

    vote = Vote(
        type=data['type'],
        user_id=current_user.id,
        post_id=post_id,
    )
    db.session.add(vote)
    db.session.commit()

    # Update the vote count for the post
    post = Post.query.get(post_id)
    db.session.commit()

    return jsonify({'upvotes': post.upvotes, 'downvotes': post.downvotes})


@vote_routes.route('/comments/<int:comment_id>/votes', methods=['POST'])
@login_required
def create_comment_vote(comment_id):
    """
    Creates a vote for a comment and returns the updated vote count
    """
    data = request.json

    # Check if the required fields are present
    if not data.get('type'):
        return jsonify({'error': 'type not provided'}), 400

    # Check if the type is valid
    if data['type'] not in ('upvote', 'downvote'):
        return jsonify({'error': 'invalid type'}), 400

    # Check if the user has already voted on the comment
    existing_vote = Vote.query.filter_by(user_id=current_user.id, comment_id=comment_id).first()
    if existing_vote:
        return jsonify({'error': 'user has already voted on this comment'}), 400

    vote = Vote(
        type=data['type'],
        user_id=current_user.id,
        comment_id=comment_id,
    )
    db.session.add(vote)
    db.session.commit()

    # Update the vote count for the comment
    comment = Comment.query.get(comment_id)
    db.session.commit()

    return jsonify({'upvotes': comment.upvotes, 'downvotes': comment.downvotes})


# Delete a vote for a post
@vote_routes.route('/post/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post_vote(post_id):
    vote = Vote.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    if vote:
        db.session.delete(vote)
        db.session.commit()
        post = Post.query.get(post_id)
        return jsonify({'upvotes': post.upvotes, 'downvotes': post.downvotes})
    else:
        return jsonify({'error': 'vote not found'}), 404


# Delete a vote for a comment
@vote_routes.route('/comment/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment_vote(comment_id):
    vote = Vote.query.filter_by(user_id=current_user.id, comment_id=comment_id).first()
    if vote:
        db.session.delete(vote)
        db.session.commit()
        comment = Comment.query.get(comment_id)
        db.session.commit()
        return jsonify({'upvotes': comment.upvotes, 'downvotes': comment.downvotes})
    else:
        return jsonify({'error': 'vote not found'}), 404


# Get the current user's vote for a post
@vote_routes.route('/posts/<int:post_id>/user-vote', methods=['GET'])
@login_required
def get_user_post_vote(post_id):
    vote = Vote.query.filter_by(user_id=current_user.id, post_id=post_id).first()
    if vote:
        return jsonify({'type': vote.type})
    else:
        return jsonify({'type': None})


# Get the current user's vote for a comment
@vote_routes.route('/comments/<int:comment_id>/user-vote', methods=['GET'])
@login_required
def get_user_comment_vote(comment_id):
    vote = Vote.query.filter_by(user_id=current_user.id, comment_id=comment_id).first()
    if vote:
        return jsonify({'type': vote.type})
    else:
        return jsonify({'type': None})
