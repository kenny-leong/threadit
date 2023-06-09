from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threadit_users.id')), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('posts.id')), nullable=False)

    votes = db.relationship('Vote', backref='comment', cascade='all, delete-orphan')

    @property
    def upvotes(self):
        return sum(vote.type == 'upvote' for vote in self.votes)

    @property
    def downvotes(self):
        return sum(vote.type == 'downvote' for vote in self.votes)



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
