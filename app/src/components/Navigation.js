import React, { Component } from "react";
import "../scss/nav.scss";

class Navigation extends Component {

    render() {
        return(
            <nav className="nav-container">

                <div className="logo-container">
                    <a aria-current="page" className="text-logo active" href="index.html">matt maxwell</a> 
                </div>

                <div className="links-container">
                    <a aria-current="page" className="link-item" href="index.html">home</a>
                    <a aria-current="page" className="link-item" href="index.html">about</a>
                    <a aria-current="page" className="link-item" href="index.html">blog</a>
                </div>
            </nav>
        )
    }
}

export default Navigation;