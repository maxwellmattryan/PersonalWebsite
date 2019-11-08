// FOOTER SECTION

// REACT IMPORT
import React, { Component } from "react";

export default class Footer extends Component {
    render() {
        return(
             <div className="footer-background animated">
                <div className="footer-container">
                    <div class="footer-title">
                        <h2>Thank you for visiting!</h2>
                    </div>
                    <div className="footer-text-container">

                        <div id="resume-about" className="resume-section">
                            <h4 className="resume-section-title">About Me</h4>
                            <p className="resume-section-description">
                                I'm a software engineer / frontend developer who enjoys building websites and 
                                applications. The both creative and highly technical challenges involved 
                                make the experience enjoyable and worthwhile.
                            </p>
                        </div>

                        <div id="resume-skills" className="resume-section">
                            <h4 className="resume-section-title">Skills</h4>
                            <p className="resume-section-description">
                                Web: <i>React JS, Redux JS, Node JS, Sass, jQuery</i>
                                <br/>
                                <br/>
                                Languages: <i>Python (fluent), JavaScript (proficient), C++ (prior experience), C# (prior experience)</i>
                                <br/>
                                <br/>
                                Design: <i>Adobe Creative Suite, Affinity Design, Affinity Photo</i>
                                <br/>
                                <br/>
                                Tools: <i>GitHub, Visual Studio Code</i>
                            </p>
                        </div>

                        <div id="resume-contact" className="resume-section">
                            <h4 className="resume-section-title">Contact</h4>
                            <p className="resume-section-description icon-container">    
                                <a href="mailto:maxwellmattryan@gmail.com" target="_blank">
                                    { <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><title>Email</title><g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M1001.2,3532.1c-144.6-38.4-400-174-386.4-203.4c4.5-11.3,1001.1-974,2214.6-2140.1L5035-928.8l214.7,212.4C5367.2-601.2,6350.3,352.5,7430.5,1401C8513,2449.6,9396.5,3317.4,9396.5,3328.7c0,11.3-61,54.2-135.6,94.9c-280.2,153.7,2.2,144.6-4271.1,142.4C1658.8,3566,1107.5,3561.4,1001.2,3532.1z"/><path d="M108.6,2436c-6.8-92.7-11.3-1209-6.8-2483.6c9-2318.6,11.3-2438.4,83.6-2515.2c18.1-18.1,2630.4,2555.9,2619.2,2583c-4.5,9-555.9,542.4-1227.1,1186.4S305.2,2427,239.7,2490.3L124.4,2601L108.6,2436z"/><path d="M8922,1656.4C8400,1150.2,7801.1,569.4,7593.2,366L7213.6-6.8l424.8-442.9c777.4-809,1839.5-1875.7,1997.7-2006.7c90.4-72.3,165-119.8,176.3-108.5c74.6,81.3,79.1,205.6,85.9,2551.3c4.5,1281.3,0,2386.4-9.1,2458.7l-18,131.1L8922,1656.4z"/><path d="M2097.3-1905.1L770.7-3220.3l88.1-38.4c207.9-88.1,219.2-88.1,4142.3-88.1c3920.8,0,3934.4,0,4140,88.1l88.1,36.2l-119.8,90.4c-151.4,113-1267.8,1227.1-1961.5,1954.8c-289.3,305.1-533.3,555.9-544.6,560.4c-9.1,4.5-309.6-275.7-664.4-621.5c-368.4-359.3-682.5-644.1-729.9-666.7c-106.2-49.7-241.8-49.7-348,0c-47.4,20.4-377.4,320.9-743.5,671.2c-361.6,348-666.7,635-675.7,639.5C3432.8-589.9,2827.2-1179.7,2097.3-1905.1z"/></g></g></svg> }
                                </a>
                                <a href="http://www.github.com/maxwellmattryan" target="_blank">
                                    { <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> }
                                </a>
                                <a href="https://www.linkedin.com/in/maxwell-matthew/" target="_blank">
                                    { <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
                                </a>
                                <a href="https://twitter.com/maxwellmattryan" target="_blank">
                                    { <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg> }
                                </a>
                            </p>
                        </div>

                        <div id="back-to-top" className="back-to-top resume-section">
                            <h4 className="resume-section-title"></h4>
                            <a class="back-to-top" href="#root">&uarr; back to top</a>
                        </div>
                    </div>
                </div>
                <div className="copyright-container resume-section">
                    <h4 className="resume-section-title"></h4>
                    <p className="copyright-text">
                        &copy; Matthew Maxwell 2019. All rights reserved.
                    </p>
                </div>
            </div>
        )
    }
}