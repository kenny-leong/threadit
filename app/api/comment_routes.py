from flask import Blueprint, jsonify, request, session
from flask_login import login_required, current_user
from app.models import Subreddit, Post, db

comment_routes = Blueprint('comments', __name__)
