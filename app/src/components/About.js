import React, { Component } from "react";

class About extends Component {
    render() {
        return(
            <div className="about-container animated">
                <div className="about-picture-container">
                    <img alt="About-me image"></img>
                </div>
                <div className="about-text-container">
                    <h2>About Me</h2>
                    <p>A paragraph of text</p>
                    <p>Another paragraph of text</p>
                    
                </div>
            </div>
        )
    }
}

export default About;