CREATE TABLE admin (
    admin_id INT AUTO_INCREMENT NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,

    PRIMARY KEY (admin_id)
);

CREATE TABLE blog_author (
    blog_author_id INT AUTO_INCREMENT NOT NULL,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,

    PRIMARY KEY (blog_author_id)
);

CREATE TABLE blog_post_status (
    blog_post_status_id INT AUTO_INCREMENT NOT NULL,

    status VARCHAR(50) NOT NULL UNIQUE,

    PRIMARY KEY (blog_post_status_id)
);

CREATE TABLE blog_post (
    blog_post_id INT AUTO_INCREMENT NOT NULL,

    blog_author_id INT NOT NULL,
    blog_post_status_id INT NOT NULL,

    title VARCHAR(255) NOT NULL UNIQUE,
    preview TINYTEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TINYTEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (blog_post_id),

    FOREIGN KEY (blog_author_id) REFERENCES blog_author(blog_author_id),
    FOREIGN KEY (blog_post_status_id) REFERENCES blog_post_status(blog_post_status_id)
);

CREATE TABLE blog_topic (
    blog_topic_id INT AUTO_INCREMENT NOT NULL,

    name VARCHAR(50) NOT NULL UNIQUE,
    description TINYTEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (blog_topic_id)
);

CREATE TABLE blog_post_topic_mapping (
    blog_post_id INT NOT NULL,
    blog_topic_id INT NOT NULL,

    PRIMARY KEY (blog_post_id, blog_topic_id),

    FOREIGN KEY (blog_post_id) REFERENCES blog_post(blog_post_id),
    FOREIGN KEY (blog_topic_id) REFERENCES blog_topic(blog_topic_id)
);

CREATE TABLE profile_status (
    profile_status_id INT AUTO_INCREMENT NOT NULL,

    status VARCHAR(50) NOT NULL UNIQUE,

    PRIMARY KEY (profile_status_id)
);

CREATE TABLE profile (
    profile_id INT AUTO_INCREMENT NOT NULL,

    profile_status_id INT NOT NULL,

    name VARCHAR(50) NOT NULL UNIQUE,
    tagline TINYTEXT NOT NULL,
    landing TINYTEXT NOT NULL,
    about TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (profile_id),

    FOREIGN KEY (profile_status_id) REFERENCES profile_status(profile_status_id)
);

CREATE TABLE project (
    project_id INT AUTO_INCREMENT NOT NULL,

    name VARCHAR(50) NOT NULL UNIQUE,
    tagline TINYTEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TINYTEXT NOT NULL,
    external_url TINYTEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (project_id)
);

CREATE TABLE profile_project_mapping (
    profile_id INT NOT NULL,
    project_id INT NOT NULL,

    PRIMARY KEY (profile_id, project_id),

    FOREIGN KEY (profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE technology (
    technology_id INT AUTO_INCREMENT NOT NULL,

    profile_id INT NOT NULL,

    name VARCHAR(50),
    icon_url TINYTEXT NOT NULL,
    display_order INT NOT NULL,

    PRIMARY KEY (technology_id),

    FOREIGN KEY (profile_id) REFERENCES profile(profile_id)
);