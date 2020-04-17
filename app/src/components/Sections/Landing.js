// LANDING SECTION

// REACT IMPORT
import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

export default withRouter(class Landing extends Component {
    render() {
        return(
            <div className="main-container">

                <div className="landing-container animated fade-in">
                    <div className="tagline-container">
                        <h1 class="landing-header">Hi! <br/> I'm a software engineer based out of Austin, TX.</h1>
                        <br/>
                        <Link className="read-more" to="/about" href="/about" aria-current="page">Contact Me &rarr;</Link>
                    </div>
                    <div className="scroll-container animated">
                        <a className="read-more" href="#operation-home">Projects <br/> &darr;</a>
                    </div>
                </div>
            </div>
        );
    }
})