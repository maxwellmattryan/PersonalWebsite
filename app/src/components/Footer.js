import React, { Component } from "react";

class Footer extends Component {
    render() {
        return(
             <div className="footer-background animated">
                <div className="footer-container">
                    <div className="footer-text-container">

                        <div className="resume-section">
                            <h4 className="resume-section-title">ABOUT ME</h4>
                            <p className="resume-section-description">Resume description.</p>
                        </div>

                        <div className="resume-section">
                            <h4 className="resume-section-title">EXPERIENCE</h4>
                            <p className="resume-section-description">Resume description.</p>
                        </div>

                        <div className="resume-section">
                            <h4 className="resume-section-title">TECH STACK</h4>
                            <p className="resume-section-description">Resume description.</p>
                        </div>

                        <div className="resume-section">
                            <h4 className="resume-section-title">SKILLS</h4>
                            <p className="resume-section-description">Resume description.</p>
                        </div>

                        <div className="resume-section">
                            <h4 className="resume-section-title">EDUCATION</h4>
                            <p className="resume-section-description">Resume description.</p>
                        </div>

                        <div className="resume-section">
                            <h4 className="resume-section-title">CONTACT</h4>
                            <p className="resume-section-description">    
                                <a href="mailto:maxwellmattryan@gmail.com" target="_blank">
                                    <span className="logo-text">Email</span>
                                    <svg alt="Logo svg here"></svg>
                                </a>
                                <a href="http://www.github.com/maxwellmattryan" target="_blank">
                                    <span className="logo-text">GitHub</span>
                                    <svg alt="Logo svg here"></svg>
                                </a>
                                <a href="https://www.linkedin.com/in/maxwell-matthew/" target="_blank">
                                    <span className="logo-text">LinkedIn</span>
                                    <svg alt="Logo svg here"></svg>
                                </a>
                                <a href="https://twitter.com/maxwellmattryan" target="_blank">
                                    <span className="logo-text">Twitter</span>
                                    <svg alt="Logo svg here"></svg>
                                </a>
                            </p>
                        </div>

                        <div className="back-to-top resume-section">
                            <h4 className="resume-section-title"></h4>
                            <a>
                                <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" className="uparrows" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><polyline points="18 15 12 9 6 15"></polyline></svg>
                                " back to top"
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer;