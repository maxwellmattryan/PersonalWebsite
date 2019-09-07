// REACT IMPORT
import React, { Component } from "react";

// SASS IMPORT
import "../scss/tech-stack.scss";

// IMAGE IMPORTS
import HTML from "../logos/color_html5.svg";
import CSS from "../logos/color_css3.svg";
import Javascript from "../logos/color_javascript.svg";
import Sass from "../logos/color_sass.svg";
import ReactJS from "../logos/color_reactjs.svg";


export default class TechStack extends Component {
    render() {
        return(
            <div className=" tech-stack-container animated fade-in">
                <div className="tech-stack-title">
                    <h2>Tech Stack</h2>
                </div>
                <div className="tech-stack-logos">
                    <div className="tech-stack-logos-item">
                        <img src={ HTML } alt="HTML5 Logo"/>
                        <p>HTML 5</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ CSS } alt="logo image"/>
                        <p>CSS 3</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ Javascript } alt="logo image"/>
                        <p>Javascript</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ Sass } alt="logo image"/>
                        <p>Sass</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img src={ ReactJS } alt="logo image"/>
                        <p>React JS</p>
                    </div>
                </div>
            </div>
        )
    }
}