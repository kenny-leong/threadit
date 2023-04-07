from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime




class Subreddit(db.Model):
    __tablename__ = 'subreddits'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text)
    profile_picture = db.Column(db.Text)
    banner_image = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    creator_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threadit_users.id')), nullable=False)

    posts = db.relationship('Post', backref='subreddit', cascade='all, delete-orphan')
    subreddit_members = db.relationship('SubredditMember', backref='subreddit', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "profile_picture": self.profile_picture,
            "banner_image": self.banner_image,
            "created_at": self.created_at.isoformat(),
            "creator_id": self.creator_id,
        }


class SubredditMember(db.Model):
    __tablename__ = 'subreddit_members'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('threadit_users.id')), nullable=False)
    subreddit_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('subreddits.id')), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "subreddit_id": self.subreddit_id,
        }
