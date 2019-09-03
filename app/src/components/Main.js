import React, { Component } from "react";
import Project from "./Project.js"
import OperationHome from "../img/operation-home.png";
import TechStack from "./TechStack.js";
import BlogShowcase from "./BlogShowcase.js";
import Footer from "./Footer.js";
import "../scss/style.scss";
import "../scss/main.scss";

class Main extends Component {
    state = {
        projects : [
            {name: "Operation H.O.M.E.", source: OperationHome},
            {name: "Distortion VST Plugin", source: OperationHome},
            {name: "JLPT Vocabulary Scraper", source: OperationHome},
        ]
    }
    render() {
        return(
            <div className="main-container">

                <div className="landing-container animated fade-in">
                    <div className="tagline-container">
                        <h1>Hi! I'm a front-end developer based out of Austin, TX.</h1>
                        <br/>
                        <a className="read-more" href="about.html">Contact Me &rarr;</a>
                    </div>
                    <div className="scroll-container animated">
                        <a className="readmore">&darr;</a>
                    </div>
                </div>

                <Project projects={ this.state.projects } />

                <TechStack />

                <BlogShowcase />

                <Footer />
            </div>
        );
    }
}

export default Main;