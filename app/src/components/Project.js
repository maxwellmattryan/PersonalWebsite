import React, { Component } from "react";


class Project extends Component {
    render() {
        return(
            <div className="project animated fade-in">
                <section className="project-container" name="JLPT Vocabulary Scraper">
                    <div className="project-inner-container">
                        <div className="project-text-container">
                            <img alt="project logo here"/>
                            <p className="project-title">project title here</p>
                            <p className="project-description"></p>
                            <a className="read-more">see project on github -></a>
                        </div>
                        <div className="project-img-container">
                            <img alt="project image here"/>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Project;