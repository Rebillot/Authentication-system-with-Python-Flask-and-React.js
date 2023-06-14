import jwt
import datetime
import os
from flask import jsonify, Flask, url_for
from api.models import User



class APIException(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv

def has_no_empty_params(rule):
    defaults = rule.defaults if rule.defaults is not None else ()
    arguments = rule.arguments if rule.arguments is not None else ()
    return len(defaults) >= len(arguments)

def generate_sitemap(app):
    links = ['/admin/']
    for rule in app.url_map.iter_rules():
        # Filter out rules we can't navigate to in a browser
        # and rules that require parameters
        if "GET" in rule.methods and has_no_empty_params(rule):
            url = url_for(rule.endpoint, **(rule.defaults or {}))
            if "/admin/" not in url:
                links.append(url)

    links_html = "".join(["<li><a href='" + y + "'>" + y + "</a></li>" for y in links])
    return """
        <div style="text-align: center;">
        <img style="max-height: 80px" src='https://storage.googleapis.com/breathecode/boilerplates/rigo-baby.jpeg' />
        <h1>Rigo welcomes you to your API!!</h1>
        <p>API HOST: <script>document.write('<input style="padding: 5px; width: 300px" type="text" value="'+window.location.href+'" />');</script></p>
        <p>Start working on your project by following the <a href="https://start.4geeksacademy.com/starters/full-stack" target="_blank">Quick Start</a></p>
        <p>Remember to specify a real endpoint path like: </p>
        <ul style="text-align: left;">"""+links_html+"</ul></div>"



def generate_token(user_id, user_mail):
    try:
        my_secret = os.environ.get('JWT_SECRET_KEY')
        payload = {
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1),
            'iat': datetime.datetime.utcnow(),
            'sub': user_id,
            'email': user_mail
        }
        return jwt.encode(payload, my_secret, algorithm='HS256')
    except jwt.ExpiredSignatureError:
        return 'Token expired. Please log in again.'
    except jwt.InvalidTokenError:
        return 'Invalid token. Please log in again.'
    except Exception as e:
        return str(e)



def validate_token(token):
    try:
        my_secret = os.environ.get('JWT_SECRET_KEY')
        payload = jwt.decode(token, my_secret, algorithms=['HS256'])

        user = User.query.filter_by(id=payload['sub']).first()
        if user:
            return user.id
        else:
            return None

    except jwt.ExpiredSignatureError:
        return jsonify(valid=False, message='Token expired. Please log in again.')
    except jwt.InvalidTokenError:
        return jsonify(valid=False, message='Invalid token. Please log in again.')
    except Exception as e:
        return jsonify(valid=False, message=str(e))



        

