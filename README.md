# LinkSwift
A single-page URL shortener application built with React JS, Python Flask, Firebase Database and Github Pages.

The project has two main components. linkswift-client and linkswift-server <br />
Feel free to clone the repository and test both components. All commands listed are Windows commands.

## linkswift-client
React Client Application styled using bootstrap CSS. The app takes the long URL as input from the user, stores it into a realtime database on firebase, generates a shortened url. The user is able to input an optional alias for the shortened link. If the field is left empty the app will generate a randomized alias for the shortened URL. 

After cloning the repository onto your local machine:

### Requirements before testing
- Firebase Account
- RealTime Database on Firebase Account
- Configure the 'firebaseconfig' object in index.js file to the object found in the project setting of your database.
### Commands to run client locally (Windows)
Make sure you have nodejs and python installed on your local machine <br/>
1. **`cd`** into the linkswift-client folder
2. **`npm install bootstrap react-bootstrap nanoid react-router-dom firebase valid-url`** (See linkswift-client folder for the purpose of each package.)
3. **`npm start`**


## linkswift-server
Python Flask Web Server that listens for calls made with the generated URL. The server will then go to the database, fetch the long URL and redirect the user to said long URL.

### Requirements before testing 
- Firebase Service account key file **`ServiceAccountKey.json`** (Generate a private key in the project settings on firebase. Copy and Paste into this file.)
- Make sure to use the correct reference url to your database in /app/main.py (line 8)
### Commands to run client locally (Windows)
Make sure you have nodejs and python installed on your local machine <br/>
When testing the flask server, it is best to do it in a virtual envrionment from step 2 onward. I have include an optional step for creating and activating a virtual environment using python but the Execution Policy of your local machine must NOT be restricted. 
1. Create a production build for the client app: <br/>
**`cd `** into the linkswift-client folder<br/>
**`npm run build`**
2. Copy and Paste the build folder into the linkswift-server/app folder 
- Option Step for creating the virtual environment. <br/> Create a virtual envirnoment and activate it: <br />
**`cd`** into the linkswift-server folder <br />
**`python -m venv {name}`** ({name} can be anything string you come up with) <br />
**`{name}/Scripts/activate`**
3. Install required packages: <br/>
**`pip install -r requirements.txt`**
4. Run **`python wsgi.py`**

  The Server should be running after step 4. To test the server fetching url's, go to any browser on your machine and type whatever reference you are given for the locally hosted server and add "/{whatever alias you are given by the client." (Remember to get rid of the "/app".


