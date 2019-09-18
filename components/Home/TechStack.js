// REACT IMPORT
import React, { Component } from "react";

// IMAGE IMPORTS
import HTML from "../logos/color_html5.svg";
import CSS from "../logos/color_css3.svg";
import Javascript from "../logos/color_javascript.svg";
import Sass from "../logos/color_sass.svg";
import ReactJS from "../logos/color_reactjs.svg";
import NodeJS from "../logos/color_nodejs.svg";

class TechStack extends Component {
    render() {
        return(
            <div className=" tech-stack-container animated fade-in">
                <div className="tech-stack-title">
                    <h2>Technologies</h2>
                </div>
                <div className="tech-stack-logos">
                    <div className="tech-stack-logos-item">
                        { <svg alt="HTML 5 icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><title>HTML5 Logo</title><path d="M108.4 0h23v22.8h21.2V0h23v69h-23V46h-21v23h-23.2M206 23h-20.3V0h63.7v23H229v46h-23M259.5 0h24.1l14.8 24.3L313.2 0h24.1v69h-23V34.8l-16.1 24.8l-16.1-24.8v34.2h-22.6M348.7 0h23v46.2h32.6V69h-55.6"/><path fill="#e44d26" d="M107.6 471l-33-370.4h362.8l-33 370.2L255.7 512"/><path fill="#f16529" d="M256 480.5V131H404.3L376 447"/><path fill="#ebebeb" d="M142 176.3h114v45.4h-64.2l4.2 46.5h60v45.3H154.4M156.4 336.3H202l3.2 36.3 50.8 13.6v47.4l-93.2-26"/><path fill="#fff" d="M369.6 176.3H255.8v45.4h109.6M361.3 268.2H255.8v45.4h56l-5.3 59-50.7 13.6v47.2l93-25.8"/></svg> }
                        <p>HTML 5</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img title="CSS 3 icon" alt="CSS 3 icon"></img>
                        <p>CSS 3</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img title="JavaScript icon" alt="JavaScript icon" src={ Javascript } />
                        <p>Javascript</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ Sass } title="Sass icon" alt="Sass icon"/>
                        <p>Sass</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ ReactJS } title="ReactJS icon" alt="React JS icon"/>
                        <p>React JS</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ NodeJS } title="NodeJS icon" alt="Node JS icon"/>
                        <p>Node JS</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default TechStack;