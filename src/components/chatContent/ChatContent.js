import React, { Component, useState, createRef, useEffect } from "react";
import axios from "axios";
import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import firebase from 'firebase';


export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  data = [/* 
    {
      key: 1,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Hi Tim, How are you?",
    },
    {
      key: 2,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I am fine.",
    },
    {
      key: 3,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "What about you?",
    },
    {
      key: 4,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "Awesome these days.",
    },
    {
      key: 5,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "Finally. What's the plan?",
    },
    {
      key: 6,
      image:
        "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
      type: "",
      msg: "what plan mate?",
    },
    {
      key: 7,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
      type: "other",
      msg: "I'm taliking about the tutorial",
    }, */
  ];

  constructor(props) {
    super(props);
    this.state = {
      chat: this.data,
      msg: "",
    };
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode == 13) {
    //     if (this.state.msg != "") {
    //       this.data.push({
    //         key: 1,
    //         type: "",
    //         msg: this.state.msg,
    //         image:
    //           "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    //       });
    //       this.setState({ chat: [...this.data] });
    //       this.scrollToBottom();
    //       this.setState({ msg: "" });
    //     }
    //   }
    // });
    // this.scrollToBottom();
    this.readMessage();
    
  }
  onStateChange = (e) => {
    this.setState({ msg: e.target.value });
  };
//
  sendMessage = () => {
      firebase.database().ref('Chat/').push({
        name: this.props.user.displayName,
        content: this.state.msg,
        timestamp : Date.now()
      });
      this.scrollToBottom();
  };
   
// CITANJE PORUKA IZ BAZE
readMessage =  () =>{
  let postElement = this.sendMessage.content;
  var readNewMessages = firebase.database().ref('Chat/');
  readNewMessages.on('value', (snapshot) => {
    const result = snapshot.val();
    var data = [];
    Object.keys(result).map(function(keyName, keyIndex) {
      data.push({
        key: keyIndex,
       type: result[keyName].name,
       msg: result[keyName].content,
       time:result[keyName].timestamp,
     });
    })
    this.setState({ chat: [...data] });  
    this.scrollToBottom();
    this.setState({ msg: "" });
    
  });
}
 userGet = () => {
  axios.get('https://login-1de5e-default-rtdb.firebaseio.com/users.json').then(resp => {
    const user = firebase.auth().currentUser;
   let userAuth= user.email;
   let userMoi= resp.data;
   let conv = Object.keys(userMoi);
   let u = conv[0];
   //let mozda =conv.email;
   
  // console.log("ovo je userMoi "+userMoi);
   console.log("ovo je conv "+conv);
   //console.log("ovo je mozda "+mozda);
   console.log("ovo je u "+resp.data.u);
 /* 
      if(userAuth === userMoi){
      console.log("poklapaju se")
    } else {
      console.log("nesto ne valja")
    }  */
    //console.log(resp.data);
});

}

  render() {
    this.userGet();
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image={this.props.user.photoURL}
              />
              <p>{this.props.user.displayName}</p>
            </div>
          </div>

         {/*   <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>*/}
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.key}
                  user={itm.type ? itm.type : this.props.user.displayName}
                  msg={itm.msg}
                  image={itm.image ? itm.image : this.props.user.photoURL}
                  time={itm.time}
                />
              );
            })}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.msg}
            />
            <button onClick={this.sendMessage} className="btnSendMsg" id="sendMsgBtn">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}