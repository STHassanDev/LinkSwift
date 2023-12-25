# LinkSwift
A single-page URL shortener application built with React JS, Python Flask, Firebase Database and Github Pages.

The project has two main components. linkswift-client and linkswift-server

## linkswift-client
React Client Application styled using bootstrap CSS. The app takes the long URL as input from the user, stores it into a realtime database on firebase, generates a shortened url. The user is able to input an optional alias for the shortened link. If the field is left empty the app will generate a randomized alias for the shortened URL. 

### Requirements before testing
- Firebase Account
- RealTime Database on Firebase Account
- Configure the 'firebaseconfig' object in index.js file to the object found in the project setting of your database.
### Commands to run client locally (Windows)
1. **`npm install`** all of the packages listed in the client README. (See linkswift-client folder)
2. **`npm start`**


## linkswift-server
Python Flask Web Server that listens for calls made with the generated URL. The server will then go to the database, fetch the long URL and redirect the user to said long URL.

### Requirements before testing 
- Firebase Service account key file **`ServiceAccountKey.json`** (Generate a private key in the project settings on firebase. Copy and Paste into this file.)
- Make sure to use the correct reference url to your database in /app/main.py
### Commands to run client locally (Windows)
1. Create a production build for the client app --
**`cd ../linkswift-client`**
**`npm run build`**
2. Copy and Paste the build folder into the linkswift-server/app folder 
3. Create a virtual envirnoment and activate it. --
**`python -m venv {name}`**
**`{name}/Scripts/activate`**
4. Run **`python wsgi.py`**


