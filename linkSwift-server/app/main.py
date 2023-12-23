from flask import Flask, redirect, render_template
import firebase_admin
from firebase_admin import db
import os

creds = firebase_admin.credentials.Certificate('./ServiceAccountKey.json')
default_app = firebase_admin.initialize_app(creds , {
    'databaseURL': 'https://linkswift-a7be9-default-rtdb.firebaseio.com/'
    })

app = Flask(__name__, static_folder='./build/static', template_folder='./build')

@app.route('/')
def hello_world():
    return redirect('/app')

@app.route('/app')
def homepage():
    return render_template('index.html')

@app.route('/<path:generatedKey>',methods=['GET'])
def fetch(generatedKey):
    ref = db.reference('/'+generatedKey)
    data = ref.get()
    if not data:
        return '404 not found' # fix later to redirect to 404 page
    else:
        longURL = data['longURL']
        return redirect(longURL)
    
@app.errorhandler(500)
def non_found(error):
    return "404 error",404