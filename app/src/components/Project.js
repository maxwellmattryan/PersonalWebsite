// REACT IMPORT
import React, { Component } from "react";

class Project extends Component {
    render() {
        const { projects } = this.props;
        const projectList = projects.map(project => {
            return(
                <div id={ project.index } className="project animated fade-in" key={ project.id }>
                    <section className="project-container">
                        <div className="project-inner-container">
                            <div className="project-text-container">
                                <p className="project-title">{ project.title }</p>
                                <p className="project-subtitle">{ project.subtitle }</p>
                                <p className="project-description">{ project.description[0] } <br/><br/> { project.description[1] }</p>
                                <div className="icon-container">
                                    <a href={ project.links[0].url } className="read-more" target="_blank">
                                        <img src={ project.links[0].icon } alt={ project.links[0].name + " logo" }/>
                                    </a>
                                    <a href={ project.links[1].url } className="read-more" target="_blank">
                                        <img src={ project.links[1].icon } alt={ project.links[1].name }/>
                                    </a> 
                                </div>                           
                            </div>
                            <a href={ project.links[0].url } className="read-more" target="_blank">
                                <div className="project-img-container">
                                    <img src={ project.source } alt={ project.title }/>
                                </div>
                            </a>
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