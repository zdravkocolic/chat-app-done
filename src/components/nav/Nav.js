import React, { Component } from "react"
import "./nav.css";
import logo from "./../../images/logo.png";

export default class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <div className="nav_blocks">
                    <img src={logo} alt="logo"></img>
                </div>
                <div className="nav_blocks"></div>
                <div className="nav_blocks"></div>
            </div>
        );
    }
}