import React, { Component } from "react";
//import { NavLink } from "react-router-dom";
import "../scss/nav.scss";

class Navigation extends Component {

    render() {
        return(
            <nav className="nav-container">

                <div className="logo-container">
                    <a aria-current="page" className="text-logo active" href="index.html">matt maxwell</a> 
                </div>

                <div className="links-container">
                    <a aria-current="page" className="link-item" href="index.html">Home</a>
                    <a aria-current="page" className="link-item" href="index.html">About</a>
                    <a aria-current="page" className="link-item" href="index.html">Blog</a>
                </div>
            </nav>
        )
    }
}

export default Navigation;