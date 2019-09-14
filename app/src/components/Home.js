// REACT IMPORT
import React, { Component } from "react";

// PROJECT IMPORTS
import Project from "./Project.js"
import OperationHome from "../img/operation-home.png";
import DistortionPlugin from "../img/distortion-plugin.png";
import JLPTScrape from "../img/jlpt-scrape.png";

// COMPONENT IMPORTS
import TechStack from "./TechStack.js";
import BlogShowcase from "./BlogShowcase.js";
import Footer from "./Footer.js";

// LOGO IMPORTS
import GitHub from "../logos/github.svg";
import ItchIO from "../logos/itch-dot-io.svg";
import GoogleDrive from "../logos/color_google-drive.svg";

import { runInThisContext } from "vm";

class Home extends Component {
    state = {
        projects : [

            // Operation H.O.M.E.
            {
                index: "operation-home", 
                source: OperationHome, 
                title: "Operation H.O.M.E.", 
                subtitle: "Unity-built Arcade Shooter", 
                description: [
                    "Operation H.O.M.E. (\"Heck Off My Earth\") is a simple arcade shooter created for the 2019 Global Game Jam. The theme of 2019 was \"home\" and what it means to you. Does home mean a sound, smell, feeling, or location? My team decided that for us it meant defending the Earth from invading aliens.",
                    "My team used the Unity engine and I used Ableton Live 10 to design sounds. I oversaw mainly audio implementation via C# scripting to ensure that sounds were triggering as desired as well as sound design. Things you'll hear include the UI/UX, a laser gun, and an arcade-y space atmosphere. If I wasn't working on sound, I was writing scripts for enemy spawning behavior and camera shake."
                ],
                links: [
                    {
                        title: "GitHub",
                        url: "https://github.com/maxwellmattryan/operation-home",
                        icon: GitHub,
                        iconPath: "../logos/github.svg"
                    },
                    {
                        title: "Itch.io",
                        url: "https://maxwellmatt.itch.io/operation-home",
                        icon: ItchIO,
                        iconPath: "../logos/color_itch-dot-io.svg"
                    }
                ]
            },

            // Distortion Plugin
            {
                index: "distortion-plugin", 
                source: DistortionPlugin, 
                title: "Distortion VST Plugin", 
                subtitle: "C++ Audio Effect", 
                description: [
                    "Distortion can be created quite simply by multiplying a signal by a real number. Using itself as that multiplier can sometimes results in pretty rough distortion, but can be adaptable for just about anything with the right mix adjustments. The gain, drive, and mix settings allow for a bit more meticulous control of the sounds.",
                    "This plugin was created using the JUCE framework by ROLI, which operates in C++. Audio programming is something that I think is incredibly interesting and refreshing to do especially since it's using C++. It's kind of like my hobby within programming."
                ], 
                links: [
                    {
                        title: "GitHub",
                        url: "https://github.com/maxwellmattryan/basic-distortion-plugin",
                        icon: GitHub,
                        iconPath: "../logos/github.svg"
                    },
                    {
                        title: "Google Drive",
                        url: "https://drive.google.com/drive/folders/17C_JE0Ml55esPL3bPV167YPPwtijaJgN?usp=sharing",
                        icon: GoogleDrive,
                        iconPath: "../logos/color_google-drive.svg"
                    }
                ]
            },

            // JLPT Scrape
            {
                index: "jlpt-scrape", 
                source: JLPTScrape, 
                title: "JLPT Vocabulary Scraper", 
                subtitle: "Python Dictionary Scraper", 
                description: [
                    "The Japanese Language Proficiency Test is rigorous. Passing the top level, referred to as N1, requires the vocabulary of roughly 8,226 words (according to jisho.org). In order to study more efficiently, I thought that a script for scraping all of these words and creating spreadsheets filled with their data would be helpful.",
                    "Using Python 3.7.4 and some of its libraries (beautiful soup, xlwt, lxml), the script searches the words that belong to a JLPT level, which is defined by the user. From the page's requested html, the script extracts the kanji, furigana, meaning(s), part of speech, and whether or not it is a commonly used word."
                ],
                links: [
                    {
                        title: "GitHub",
                        url: "https://github.com/maxwellmattryan/jisho-search",
                        icon: GitHub,
                        iconPath: "../logos/github.svg"
                    },
                    {
                        title: "Google Drive",
                        url: "https://drive.google.com/drive/folders/1BAvCwVEkObtevfx9YwB0gGtDbqpndqsj?usp=sharing",
                        icon: GoogleDrive,
                        iconPath: "../logos/color_google-drive.svg"
                    }
                ]
            },
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

                {/* <BlogShowcase /> */}

                <Footer />
            </div>
        );
    }
}

export default Home;