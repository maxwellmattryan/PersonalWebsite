import React, { Component } from "react";

import Project from "./Project.js"
import OperationHome from "../img/operation-home.png";
import DistortionPlugin from "../img/distortion-plugin.png";
import JLPTScrape from "../img/jlpt-scrape.png";

import TechStack from "./TechStack.js";
import BlogShowcase from "./BlogShowcase.js";
import Footer from "./Footer.js";

import "../scss/style.scss";
import "../scss/main.scss";
import "../scss/project.scss";
import "../scss/footer.scss";
import "../scss/tech-stack.scss";

class Main extends Component {
    state = {
        projects : [
            {
                index: "operation-home", 
                source: OperationHome, 
                title: "Operation H.O.M.E.", 
                subtitle: "Global Game Jam 2019", 
                description: "Operation H.O.M.E. (\"Heck Off My Earth\") is a simple arcade shooter created for the 2019 Global Game Jam. The theme of 2019 was \"home\" and what it means to you. Does home mean a sound, smell, feeling, or location? My team decided that for us it meant defending the Earth from invading aliens. Operation H.O.M.E. was made using Unity engine and sounds were designed in Ableton Live 10. I oversaw mainly audio implementation via C# scripting to ensure that sounds were triggering as desired as well as sound design. Throughout the jam, I also wrote scripts for enemy spawning behavior and camera shake."
            },
            {
                index: "distortion-plugin", 
                source: DistortionPlugin, 
                title: "Distortion VST Plugin", 
                subtitle: "Music Production", 
                description: "Distortion can be created quite simply by multiplying a signal by a real number or itself. With such a simple calculation leading to an intriguing sound effect, building a distortion algorithm seemed like a lot of fun. The gain, drive, and mix settings allow for a bit moire control of the sounds. This plugin was created using the JUCE framework by ROLI and writing C++ in Visual Studio.", 
                url: "https://github.com/maxwellmattryan/basic-distortion-plugin"},
            {
                index: "jlpt-scrape", 
                source: JLPTScrape, 
                title: "JLPT Vocabulary Scraper", 
                subtitle: "Japanese Language Proficiency Test", 
                description: "Scrape jisho.org to find and export JLPT vocabulary words.", 
                url: "https://github.com/maxwellmattryan/jisho-search"},
        ]
    }
    render() {
        return(
            <div className="main-container">

                <div className="landing-container animated fade-in">
                    <div className="tagline-container">
                        <h1>Hi! <br/> I'm a front-end developer based out of Austin, TX.</h1>
                        <br/>
                        <a className="read-more" href="about.html">Contact Me &rarr;</a>
                    </div>
                    <div className="scroll-container animated">
                        <a className="read-more" href="#operation-home">Projects <br/> &darr;</a>
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