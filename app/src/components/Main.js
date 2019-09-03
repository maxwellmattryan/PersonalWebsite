import React, { Component } from "react";
import Project from "./Project.js"
import OperationHome from "../img/operation-home.png";
import DistortionPlugin from "../img/operation-home.png";
import JLPTScrape from "../img/operation-home.png";
import TechStack from "./TechStack.js";
import BlogShowcase from "./BlogShowcase.js";
import Footer from "./Footer.js";
import "../scss/style.scss";
import "../scss/main.scss";

class Main extends Component {
    state = {
        projects : [
            {index: "project_0", layout: "0", source: OperationHome, title: "Operation H.O.M.E.", subtitle: "Global Game Jam 2019", description: "Defend the earth as aliens are attempting to invade and destroy it!", url: "https://github.com/maxwellmattryan/operation-home"},
            {index: "project_1", layout: "1", source: DistortionPlugin, title: "Distortion VST Plugin", subtitle: "Music Production", description: "Distort audio in a gnarly way with control over the gain, drive, and mix.", url: "https://github.com/maxwellmattryan/basic-distortion-plugin"},
            {index: "project_2", layout: "0", source: JLPTScrape, title: "JLPT Vocabulary Scraper", subtitle: "Japanese Language Proficiency Test", description: "Scrape jisho.org to find and export JLPT vocabulary words.", url: "https://github.com/maxwellmattryan/jisho-search"},
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
                        <a className="read-more" href="#project_0">Projects <br/> &darr;</a>
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