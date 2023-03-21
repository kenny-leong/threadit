from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Comment, Post, Vote, db

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('', methods=['POST'])
@login_required
def create_vote():
    """
    Creates a vote and returns the updated vote count for the post or comment
    """
    data = request.json

    # Check if the required fields are present
    if not data.get('type') or not (data.get('comment_id') or data.get('post_id')):
        return jsonify({'error': 'type, comment_id or post_id not provided'}), 400

    # Check if the type is valid
    if data['type'] not in ('upvote', 'downvote'):
        return jsonify({'error': 'invalid type'}), 400

    # Check if the user has already voted on the post or comment
    existing_vote = None
    if data.get('post_id'):
        existing_vote = Vote.query.filter_by(user_id=current_user.id, post_id=data['post_id']).first()
    elif data.get('comment_id'):
        existing_vote = Vote.query.filter_by(user_id=current_user.id, comment_id=data['comment_id']).first()

    if existing_vote:
        return jsonify({'error': 'user has already voted on this post or comment'}), 400

    vote = Vote(
        type=data['type'],
        user_id=current_user.id,
        post_id=data.get('post_id'),
        comment_id=data.get('comment_id')
    )
    db.session.add(vote)
    db.session.commit()


    # Update the vote count for the post or comment
    if data.get('post_id'):
        post = Post.query.get(data['post_id'])
        post.upvotes = Vote.query.filter_by(post_id=data['post_id'], type='upvote').count()
        post.downvotes = Vote.query.filter_by(post_id=data['post_id'], type='downvote').count()
        db.session.commit()
        return jsonify({'upvotes': post.upvotes, 'downvotes': post.downvotes})
    elif data.get('comment_id'):
        comment = Comment.query.get(data['comment_id'])
        comment.upvotes = Vote.query.filter_by(comment_id=data['comment_id'], type='upvote').count()
        comment.downvotes = Vote.query.filter_by(comment_id=data['comment_id'], type='downvote').count()
        db.session.commit()
        return jsonify({'upvotes': comment.upvotes, 'downvotes': comment.downvotes})


# Delete a vote for a post
@vote_routes.route('/posts/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post_vote(post_id):
    vote = Vote.query.filter_by(post_id=post_id, user_id=current_user.id).first()
    if vote:
        db.session.delete(vote)
        db.session.commit()
        return {'message': 'Vote deleted successfully'}
    return {'error': 'No vote found for that post'}


# Delete a vote for a comment
@vote_routes.route('/comments/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment_vote(comment_id):
    vote = Vote.query.filter_by(comment_id=comment_id, user_id=current_user.id).first()
    if vote:
        db.session.delete(vote)
        db.session.commit()
        return {'message': 'Vote deleted successfully'}
    return {'error': 'No vote found for that comment'}
