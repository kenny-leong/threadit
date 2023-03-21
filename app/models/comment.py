from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('posts.id'), nullable=False)

    upvotes = db.Column(db.Integer, default=0)
    downvotes = db.Column(db.Integer, default=0)

    votes = db.relationship('Vote', backref='comment')

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "author_id": self.author_id,
            "post_id": self.post_id,
            "upvotes": self.upvotes,
            "downvotes": self.downvotes
        }

    def update_votes(self):
        self.upvotes = Vote.query.filter_by(comment_id=self.id, type='upvote').count()
        self.downvotes = Vote.query.filter_by(comment_id=self.id, type='downvote').count()
