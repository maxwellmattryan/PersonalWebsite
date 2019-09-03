import React, { Component } from "react";
import "../scss/project.scss"

class Project extends Component {
    render() {
        const { projects } = this.props;
        const projectList = projects.map(project => {
            return(
                <div id={ project.index } className="project animated fade-in" key={ project.id }>
                    <section className="project-container">
                        <div className="project-inner-container">
                            <div className="project-img-container">
                                <a href={ project.url } className="read-more" target="_blank">
                                    <img src={ project.source } alt={ project.title}/>
                                </a>
                            </div>
                            <div className="project-text-container">
                                <p className="project-title">{ project.title }</p>
                                <p className="project-subtitle">{ project.subtitle }</p>
                                <p className="project-description">{ project.description }</p>
                                <a href={ project.url } className="read-more" target="_blank">View on GitHub &rarr;</a>
                            </div>
                        </div>
                    </section>
                </div>
            )
        })
        return(
            <>
                { projectList }
            </>
        )
    }
}

export default Project;