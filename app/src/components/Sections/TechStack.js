// TECH STACK SECTION

// REACT IMPORT
import React from "react";

export default class TechStack extends React.Component {
    render() {
        const { technologies } = this.props;
        const techList = technologies.map(technology => {
            return(
                <div className="tech-stack-logos-item">
                    <img src={ technology.logo } alt={ technology.name } title={ technology.name } />
                    <p>{ technology.name }</p>
                </div>
            );
        });
        return(
            <div className=" tech-stack-container animated fade-in">
                <div className="tech-stack-title">
                    <h2>Technologies</h2>
                </div>
                <div className="tech-stack-logos">
                    { techList }
                </div>
            </div>
        );
    }
}