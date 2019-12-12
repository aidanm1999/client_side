# ClientSide - Building an offline PWA

## Running Instructions
To open the application, there are three options:

- If you do not want to download the SPA, visit the webpage: <https://clientside.aidanm.com>
- If you would like to download the SPA, [fork the repository](https://github.com/aidanm1999/client_side) on GitHub and clone to your machine
  1. Install a web server (Web Server for Chrome, Firebase Serve, etc...)
  2. Direct it to the root folder of the app (clientside)
  3. The web server should prompt you to a localhost or ip address where the site will be hosted on. Depending on the server you are running, you may see the site at the root of the application on your browser or you will see a file directory. 
  4. If you see a directory on your browser, navigate to the ‘public’ directory. The webpage should appear. 
  5. If the website does not appear, navigate to ‘index.html’ in the ‘public’ directory.

Note: The client web pages call to the server hosting the backend and database. This is not calling to code on your machine, it is calling to these endpoints:

- [GET] <https://us-central1-clientside-74013.cloudfunctions.net/sessions>
- [GET] <https://us-central1-clientside-74013.cloudfunctions.net/talkRatings>
- [GET] <https://us-central1-clientside-74013.cloudfunctions.net/talks>

These endpoints are hosted by firebase functions, however if you would like to see the code for the backend endpoints, navigate to [client_side/functions/index.js](https://github.com/aidanm1999/clientside/blob/master/functions/index.js)
