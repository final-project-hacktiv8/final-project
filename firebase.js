const app = require('firebase/app')
require('firebase/firebase-firestore')
require('dotenv').config()
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest


const firebaseConfig = {
	apiKey: process.env.API_KEY,
	authDomain: process.env.AUTH_DOMAIN,
	projectId: process.env.PROJECT_ID
}

const firebase = app.initializeApp(firebaseConfig)


const db = firebase.firestore()


module.exports = {
  db,
  app
}

