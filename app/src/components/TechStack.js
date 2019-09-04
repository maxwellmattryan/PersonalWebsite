import React, { Component } from "react";

export default class TechStack extends Component {
    render() {
        return(
            <div className=" tech-stack-container animated fade-in">
                <div className="tech-stack-title">
                    <h2>tech stack</h2>
                </div>
                <div className="tech-stack-logos">
                    <div className="tech-stack-logos-item">
                        <img src="../logos/color_html5.svg" alt="HTML5 Logo"/>
                        <p>logo name</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img alt="logo image"/>
                        <p>logo name</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img alt="logo image"/>
                        <p>logo name</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img alt="logo image"/>
                        <p>logo name</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img alt="logo image"/>
                        <p>logo name</p>
                    </div>
                    <div className="tech-stack-logos-item">
                        <img alt="logo image"/>
                        <p>logo name</p>
                    </div>
                </div>
            </div>
        )
    }
}