"""
Routes and views for the bottle application.
"""

from bottle import route, view, request, get, post
from datetime import datetime
from bottle import template


@route('/')
@route('/login')
@view('login')
def home():
    """Renders the home page."""
    return dict (
    )
   



@route('/profile')
@view('profile')
def profile():
    """Renders the contact page."""
    

    return dict(
        title='Contact',
        message='Your contact page.',
        year=datetime.now().year
    )
@route('/register')
@view('Register')
def register():
    """ returns register page """
    return dict()



@route('/emailConfirmation')
@view('emailConfirmation')
def register():
    """ returns emailConfirmation page """
    return dict()


@route('/activity')
@view('activity.html')
def activity():
    """ returns emailConfirmation page """
    return dict()