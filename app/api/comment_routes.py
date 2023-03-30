from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Comment, Post, db

comment_routes = Blueprint('comments', __name__)



@comment_routes.route('', methods=['POST'])
@login_required
def create_comment():
    """
    Create a new comment for a post
    """
    data = request.get_json()
    post_id = data.get('post_id')
    content = data.get('content')
    if not post_id or not content:
        return jsonify({'error': 'Please provide a post_id and content for the comment'}), 400
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    comment = Comment(
        content=content,
        author_id=current_user.id,
        post_id=post_id
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201


@comment_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_comment(id):
    """
    Update a comment by id
    """
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.author_id != current_user.id:
        return jsonify({'error': 'You are not authorized to update this comment'}), 403
    data = request.get_json()
    content = data.get('content')
    if not content:
        return jsonify({'error': 'Please provide content for the comment'}), 400
    comment.content = content
    db.session.commit()
    return jsonify(comment.to_dict())


@comment_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_comment(id):
    """
    Delete a comment by id
    """
    comment = Comment.query.get(id)
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404
    if comment.author_id != current_user.id:
        return jsonify({'error': 'You are not authorized to delete this comment'}), 403
    db.session.delete(comment)
    db.session.commit()
    return jsonify({'message': 'Comment successfully deleted'})


@comment_routes.route('/post/<int:post_id>')
def comments_by_post(post_id):
    """
    Query for all comments associated with a specific post and return them in a list of comment dictionaries
    """
    comments = Comment.query.filter_by(post_id=post_id).all()
    return {'comments': [comment.to_dict() for comment in comments]}
