// REACT IMPORT
import React, { Component } from "react";

// SASS IMPORT
import "../scss/about.scss";

// IMAGE IMPORTS
import Portrait from "../img/portrait.jpg";


class About extends Component {
    render() {
        return(
            <div className="about-container animated">
                <div className="about-text-container">
                    <h2>About Me</h2>
                    <p>
                        Ever since I was little, I have always been fascinated with computers and all things technological.
                        In my earliest years, this was attributed to video games. After that was the introduction of graphic design via
                        speed art videos on YouTube. 
                    </p>
                    <p>
                        As of now, I am applying my passion of technology into web development and software 
                        engineering. I am currently studying Computer Science and Art and Entertainment Technologies at
                        the University of Texas at Austin. 
                    </p>
                </div>
                <div className="about-image-container">
                    <img src={ Portrait } alt="About me image"></img>
                </div>
            </div>
        )
    }
}

export default About;