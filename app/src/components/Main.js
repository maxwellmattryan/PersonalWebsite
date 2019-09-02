import React, { Component } from "react";
import Project from "./Project.js"
import TechStack from "./TechStack.js";
import BlogShowcase from "./BlogShowcase.js";
import Footer from "./Footer.js";
import "../css/style.css";

class Main extends Component {
    render() {
        return(
            <div className="main-container">

                <div className="landing-container animated fade-in">
                    <div className="tagline-container">
                        <h1>i'm a front-end developer based out of austin, tx.</h1>
                        <a className="read-more" href="about.html">contact me -></a>
                    </div>
                    <div className="scroll-container">
                        <a className="readmore">\/</a>
                    </div>
                </div>

                <Project />
                <Project />
                <Project />

                <TechStack />

                <BlogShowcase />
                
                <Footer />
            </div>
        );
    }
}

export default Main;