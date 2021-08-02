# Simple React Chat App
[![Deploy to Firebase Hosting on merge](https://github.com/ndungx/react-chat-app/actions/workflows/firebase-hosting-merge.yml/badge.svg)](https://github.com/ndungx/react-chat-app/actions/workflows/firebase-hosting-merge.yml)  
Demo: [https://react-chat-app-dc540.web.app](https://react-chat-app-dc540.web.app)

## Usage
### Install dependencies
```
npm install
```

### Get SSL Certificate
Because login with Facebook need HTTPS, you need to create a self-signed certificate for your localhost  

The following steps will create a SSL certìicate  
   - You need to install [Chocolatey](https://chocolatey.org/install) first so that you can install mkcert  
   - Open powershell and run  
```
choco install mkcert
```
   - Set up mkcert on your computer
```
mkcert -install
```
   - Create a certificate (run this command from root project directory)
```
mkcert -key-file key.pem -cert-file cert.pem "localhost"
```

### Configuration for firebase
   - Create a firebase project
   - Create firestore database
   - Go to project settings
   - Copy the firebaseConfig script and replace that script in file "src/firebase/config.js"
   - In tab "Sign-in method", enable and configure for login with Google and Facebook

### Run React development server (http://localhost:3000)
```
npm run start
```

### Run firestore emulators for development (http://localhost:4000)
Why using firestore emulator?  
-> Because firestore limit reads at 50k and write at 20k for free plan. In development, we can make any misktake like the infinite loop for read or write something into database, that can make you run out of read or write. So firestore emulator is a good choice in development stage because it run in local server, so you can use it for developement without any problem.

Remove file firebase.json, .firebaserc, and all files from emulators folder of my own project  
Now the following steps will create a firestore emulator (run these command below from emulators folder)  
   - You need to install [firebase-tools](https://firebase.google.com/docs/cli/install) first or using npm command  
```
npm i -g firebase-tools
```  
   - Now you can use firebase CLI. Next, you need to login with your firebase account  
```  
firebase login
```
   - After login success, you can create a firebase project uisng  
```
firebase init
```
   - Choose "Emulators: set up local emulators for Firebase products", and "Firestore: configure secutity rules and indexes files for Firestore"  
   - Choose "Use an existing project" and choose your firebase project you have created before  
   - After that, you press enter to select the default option until you see "=== Emulators set up"  
   - Then you choose "Authentication Emulator" and "Firestore Emulator"  
   - Still press enter to select default options until the end of the process  
   - To use firestore emulator, you need to uncomment 2 line in file "src/firebase/config.js"  

Now you can use firestore emulator by using
```
firebase emulators:start
```  

If you cannot run "firebase" command in powershell, you can change to command prompt to run it

### Build for production
```
npm run build
```

## More info
Any problem or help me to improve project, please contact me via:  
* [Facebook](https://www.facebook.com/ndungx)  
* [Gmail](mailto:dpron12345@gmail.com)  

© 2021 ndungx
