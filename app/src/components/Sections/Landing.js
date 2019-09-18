// LANDING SECTION

// REACT IMPORT
import React, { Component } from "react";
import { withRouter } from "react-router";

export default withRouter(class Landing extends Component {
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
            </div>
        );
    }
})