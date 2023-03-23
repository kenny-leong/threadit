from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Post(db.Model):
    __tablename__ = 'posts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    content = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    author_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threadit_users.id')), nullable=False)
    subreddit_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('subreddits.id')), nullable=False)

    comments = db.relationship('Comment', backref='post', cascade='all, delete-orphan')
    votes = db.relationship('Vote', backref='post', cascade='all, delete-orphan')

    @property
    def upvotes(self):
        return sum(vote.type == 'upvote' for vote in self.votes)

    @property
    def downvotes(self):
        return sum(vote.type == 'downvote' for vote in self.votes)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "content": self.content,
            "created_at": self.created_at.isoformat(),
            "author_id": self.author_id,
            "subreddit_id": self.subreddit_id,
            "image_url": self.image_url,
            "upvotes": self.upvotes,
            "downvotes": self.downvotes
        }
