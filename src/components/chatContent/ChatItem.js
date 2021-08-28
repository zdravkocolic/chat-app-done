import React, { Component } from "react";
import Avatar from "../chatList/Avatar";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
   // console.log(this)
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.msg}</div>
          <hr></hr>
          <div className="chat__meta">
            <span>{this.props.user}</span>
              &nbsp;&nbsp;
            <span>{new Date(new Date(this.props.time).getTime()).toLocaleString()}</span>
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
      </div>
    );
  }
}