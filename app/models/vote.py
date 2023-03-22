from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Vote(db.Model):
    """
    Model for storing votes on posts and comments.
    The type field indicates whether the vote is an upvote or downvote.
    The post_id and comment_id fields are foreign keys to the Post and Comment tables, indicating which post or comment the vote was cast on.
    Note that post_id and comment_id are nullable, because a vote can be cast on either a post or a comment, but not both.
    If post_id is not null, it means the vote was cast on a post. If comment_id is not null, it means the vote was cast on a comment.
    """

    __tablename__ = 'votes'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(10), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('threadit_users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "type": self.type,
            "created_at": self.created_at.isoformat(),
            "user_id": self.user_id,
            "post_id": self.post_id,
            "comment_id": self.comment_id
        }
