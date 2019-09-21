import * as firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = ({
   apiKey: "AIzaSyCdaJLXV4HpK1z3e5PNl6oCUbsniwf2IFI",
   authDomain: "final-project-81868.firebaseapp.com",
   databaseURL: "https://final-project-81868.firebaseio.com",
   projectId: "final-project-81868",
   storageBucket: "",
   messagingSenderId: "656367599741",
   appId: "1:656367599741:web:08ec6a82479df29faf3114"
})

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

export default db