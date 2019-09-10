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
                    <div className="link-item-container">
                        <a aria-current="page" className="link-item" href="index.html">Home</a>
                    </div>
                    <div className="link-item-container">
                        <a aria-current="page" className="link-item" href="index.html">About</a>
                    </div>
                    <div className="link-item-container">
                        <a aria-current="page" className="link-item" href="index.html">Blog</a>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;