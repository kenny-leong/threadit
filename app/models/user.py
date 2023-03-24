from flask_login import UserMixin
from werkzeug.security import check_password_hash, generate_password_hash

from .db import SCHEMA, add_prefix_for_prod, db, environment


class User(db.Model, UserMixin):
    __tablename__ = 'threadit_users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    subreddit_memberships = db.relationship('SubredditMember', backref='user', cascade='all, delete-orphan')
    owned_subreddits = db.relationship('Subreddit', backref='creator')
    posts = db.relationship('Post', backref='author')
    comments = db.relationship('Comment', backref='author')
    votes = db.relationship('Vote', backref='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'owned_subreddits': [subreddit.to_dict() for subreddit in self.owned_subreddits],
            'subreddit_memberships': [membership.subreddit.to_dict() for membership in self.subreddit_memberships]
        }
