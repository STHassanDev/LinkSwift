from flask import Flask, redirect, render_template
import firebase_admin
from firebase_admin import db
import os

creds = firebase_admin.credentials.Certificate('./ServiceAccountKey.json')
default_app = firebase_admin.initialize_app(creds)