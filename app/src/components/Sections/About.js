// ABOUT SECTION

// REACT IMPORT
import React from "react";
import { withRouter } from "react-router";

// IMAGE IMPORTS
import Portrait from "../../img/portrait.jpg";

export default withRouter(class About extends React.Component {
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
                    <img src={ Portrait } alt="About me"></img>
                </div>
            </div>
        );
    }
})