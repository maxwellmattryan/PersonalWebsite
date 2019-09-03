import React, { Component } from "react";
import "../scss/project.scss"

class Project extends Component {
    render() {
        const { projects } = this.props;
        const projectList = projects.map(project => {
            return(
                <div className="project animated fade-in" key={ project.id }>
                    <section className="project-container">
                        <div className="project-inner-container">
                            <div className="project-text-container">
                                <img alt="project logo here"/>
                                <p className="project-title">{ project.name }</p>
                                <p className="project-description">Project description.</p>
                                <a className="read-more">see project on github -></a>
                            </div>
                            <div className="project-img-container">
                                <img src={ project.source } alt="project image here"/>
                            </div>
                        </div>
                    </section>
                </div>
            )
        })
        return(
            <div className="projects">
                { projectList }
            </div>
        )
    }
}

export default Project;