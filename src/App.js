import './App.css';
import React, {useState, useEffect} from "react";
import fire from "./fire";
import Login from "./Login";
import Hero from "./Hero";
import './App.css';
import firebase from 'firebase';
import axios from 'axios';




const App = () => {


  const [user, setUser] = useState('');
  const [email, setEmail] = useState ('');
  const [username, setUsername] = useState ('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError]= useState('');
  const [passwordError, setPasswordError]= useState('');
  const [hasAccount, setHasAccount] = useState(false);


  const clearInputs = () =>{
    setEmail('');
    setPassword('');
    setUsername('');
  }

  const clearErrors =() => {
    setEmailError('');
    setPasswordError('');
    setUsername('');
  }
const handleLogin = () =>{
  clearErrors();
  fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(err =>{
        switch(err.code){
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
            case "auth/wrong-password":
              setPasswordError(err.message);
              break;
        }  
      });

};
const userPost =() =>{
  const user = firebase.auth().currentUser;
  axios.post('https://login-1de5e-default-rtdb.firebaseio.com/users.json', {
    name: username ? username : email,
    email: email
  })
  .then(function (response) {
    console.log(response);
  })
}
const handleSignup = () =>{
  clearErrors();
  fire
      .auth()
      .createUserWithEmailAndPassword(email, password).then(userPost())
      .catch(err =>{
        switch(err.code){
          case "auth/email-already-in-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
            case "auth/weak-password":
              setPasswordError(err.message);
              break;
        }  
      });
};

const logWithGoogle = () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    var userIme= user.displayName;
    var userMail= user.email;
    
  axios.post('https://login-1de5e-default-rtdb.firebaseio.com/users.json', {
    name: userIme ? userIme : userMail,
    email: userMail
  })
  .then(function (response) {
    console.log(response);
  })
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
  
}

const logWithGit = () => {
  var provider = new firebase.auth.GithubAuthProvider();
  firebase.auth()
  .signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;
   
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
  //  console.log(user);
    var userIme= user.displayName;
    var userMail= user.email;
    
  axios.post('https://login-1de5e-default-rtdb.firebaseio.com/users.json', {
    name: userIme ? userIme : userMail,
    email: userMail
  })
  .then(function (response) {
    console.log(response);
  })
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

  var database = firebase.database();
  function writeUserData(message) {
    firebase.database().ref('Chat/').set({
      username: user.displayName,
      content: message,
      timestamp: Date.now()
    });
  }


const handleLogout = () =>{
  fire.auth().signOut();
};

const authListener = () => {

  fire.auth().onAuthStateChanged(user => {
    if(user){
      clearInputs();
      setUser(user);
    }else {
      setUser("");
    }
  })
}

useEffect(()=> {

  authListener();
}, [])


  return (
    <div className="App">
      {user ? (
          <>
           <Hero handleLogout={handleLogout} user={user} />
          </>
      ) : (
        <Login email={email} setEmail={setEmail} username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount} 
        logWithGoogle={logWithGoogle}
        logWithGit={logWithGit}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passwordError={passwordError}
        />
      )}
      
      
    </div>
  );

}

export default App;