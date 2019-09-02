import React, { Component } from "react";

class BlogShowcase extends Component {
    render() {
        return(
            <div className="blog-container animated fade-in">
                <div className="blog-item-container">
                    <img alt="blog image here"/>
                    <div className="blog-text-container">
                        <h3 className="blog-title">Blog title here</h3>
                        <p className="blog-description">Blog description here. Blog description here. Blog description here.</p>
                        <p className="blog-date">September 9th, 2019</p>
                    </div>
                </div>
                <div className="blog-item-container">
                    <img alt="blog image here"/>
                    <div className="blog-text-container">
                        <h3 className="blog-title">Blog title here</h3>
                        <p className="blog-description">Blog description here. Blog description here. Blog description here.</p>
                        <p className="blog-date">September 9th, 2019</p>
                    </div>
                </div>
                <div className="blog-item-container">
                    <img alt="blog image here"/>
                    <div className="blog-text-container">
                        <h3 className="blog-title">Blog title here</h3>
                        <p className="blog-description">Blog description here. Blog description here. Blog description here.</p>
                        <p className="blog-date">September 9th, 2019</p>
                    </div>
                </div>
                <div className="scroll-container">
                    <a className="read-more">Read more</a>
                </div>
            </div>
        )
    }
}

export default BlogShowcase;