import firebase from './apis/firebase'

//create user
firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {

    })
    .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    });

//login user
firebase.auth().signInWithEmailAndPassword(email, password)
    .then((data) => {
      localStorage.setItem('token', data.user.l)
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
    });