// MAIN NAVIGATION BAR

// REACT IMPORTS
import React from "react";
import { Link } from "react-router-dom";

export default class MainNavBar extends React.Component {
    render() {
        return(
            <nav className="nav-container">
                <div className="logo-container">
                    <a aria-current="page" className="text-logo active" href="/">matt maxwell</a> 
                </div>
                <div className="links-container">
                    <div className="link-item-container">
                        <Link to="/" aria-current="page" className="link-item" href="/">Home</Link>
                    </div>
                    <div className="link-item-container">
                        <Link to="/about" aria-current="page" className="link-item" href="/about">About</Link>
                    </div>
                    {/* <div className="link-item-container">
                        <a aria-current="page" className="link-item" href="index.html">Blog</a>
                    </div> */}
                </div>
            </nav>
        );
    }
}