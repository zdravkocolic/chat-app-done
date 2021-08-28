import React, { Component } from "react";
import "./userProfile.css";

import firebase from "firebase";

export default class UserProfile extends Component {
  /* toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
    
  }; */
 
  render() {
   const userIme = () =>{
      var ime =this.props.user.displayName;
      if(ime === null){
        var ime = this.props.user.email;
      }
     // console.log(this.props.user);
      return ime;
    }
    const userPhoto = () => {
      var slika = this.props.user.photoURL;
      
      if(slika === null){
       slika= 'https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg'
      }
      return slika;
    }

   
    const update = () =>{
  
   const user = firebase.auth().currentUser;

 user.updateProfile({
  displayName: "",
  email: "",
  photoURL: ""
}).then(() => {
  // Update successful
  // ...
}).catch((error) => {
  // An error occurred
  // ...
}); }
// FALI DA NADJEM KAKO DA PODESIM DISPLAYNAME
const user = firebase.auth().currentUser;

    if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
       console.log("  Name: " + profile.displayName);
       console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
      
    }
    return (
      
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src={userPhoto()} />
            
          </div>
          <h4>{userIme()}</h4>
        
         
        </div>
        <div className="profile__card" /* onClick={this.toggleInfo} */>
          <div className="card__header">
            <h4>Information</h4>
            <i className="fa fa-angle-down"></i>
        </div>
          <div className="card__content">
            
            <p>{"Name: "+ user.displayName}</p>
            <p>{"Email: "+ user.email}</p>
            <p>{" Photo URL: "+ user.photoURL}</p>
            
          </div>
        </div>
      </div>
    );
  }
}