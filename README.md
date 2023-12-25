# LinkSwift
A single-page URL shortener application built with React JS, Python Flask, Firebase Database and Github Pages.

The project has two main components. linkswift-client and linkswift-server

## linkswift-client
React Client Application styled using bootstrap CSS. The app takes the long URL as input from the user, stores it into a realtime database on firebase, generates a shortened url. The user is able to input an optional alias for the shortened link. If the field is left empty the app will generate a randomized alias for the shortened URL. 

### Requirements before testing
- Firebase Account
- RealTime Database on Firebase Account
- Configure the 'firebaseconfig' object in index.js file to the object found in the project setting of your database.



## linkswift-server
Python Flask Web Server that listens for calls made with the generated URL. The server will then go to the database, fetch the long URL and redirect the user to said long URL.

