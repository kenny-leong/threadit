from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Subreddit(db.Model):
    __tablename__ = 'subreddits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threadit_users.id')), nullable=False)

    posts = db.relationship('Post', backref='subreddit', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
            "creator_id": self.creator_id
        }
