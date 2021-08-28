import React from "react";
import Nav from "./components/nav/Nav";
import ChatBody from "./components/chatBody/ChatBody";
import ChatContent from "./components/chatContent/ChatContent";

const Hero = ({handleLogout, user}) => {

    return(

        <section className="hero">
            {<nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>}
            <Nav />
            <ChatBody user={user} />
           
        </section>
    )
}
export default Hero;