import React, { Component} from "react";
import ChatContent from "../chatContent/ChatContent";
import ChatList from "../chatList/ChatList";
import UserProfile from "../userProfile/UserProfile";
import "./chatBody.css";

const ChatBody = ({ user}) => {

    return(

        <div className="main_chatbody">
{/*        <ChatList />
 */}        <ChatContent user={user}/>
        <UserProfile user={user}/>
    </div>
    )
}
export default ChatBody;
