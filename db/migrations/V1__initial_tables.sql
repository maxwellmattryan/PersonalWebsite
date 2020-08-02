CREATE TABLE admin (
    admin_id SERIAL PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE blog_author (
    blog_author_id SERIAL PRIMARY KEY,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE blog_post_status (
    blog_post_status_id SERIAL PRIMARY KEY,

    status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE blog_post (
    blog_post_id SERIAL PRIMARY KEY,

    blog_author_id INT NOT NULL,
    blog_post_status_id INT NOT NULL,

    title VARCHAR(255) NOT NULL UNIQUE,
    preview TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (blog_author_id) REFERENCES blog_author(blog_author_id),
    FOREIGN KEY (blog_post_status_id) REFERENCES blog_post_status(blog_post_status_id)
);

CREATE TABLE blog_topic (
    blog_topic_id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blog_post_topic_mapping (
    blog_post_id INT NOT NULL,
    blog_topic_id INT NOT NULL,

    FOREIGN KEY (blog_post_id) REFERENCES blog_post(blog_post_id),
    FOREIGN KEY (blog_topic_id) REFERENCES blog_topic(blog_topic_id)
);

CREATE TABLE profile_status (
    profile_status_id SERIAL PRIMARY KEY,

    status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE profile (
    profile_id SERIAL PRIMARY KEY,

    profile_status_id INT NOT NULL,

    name VARCHAR(50) NOT NULL UNIQUE,
    tagline TEXT NOT NULL,
    landing TEXT NOT NULL,
    about TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (profile_status_id) REFERENCES profile_status(profile_status_id)
);

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL UNIQUE,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    external_url TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE profile_project_mapping (
    profile_id INT NOT NULL,
    project_id INT NOT NULL,

    FOREIGN KEY (profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (project_id) REFERENCES project(project_id)
);

CREATE TABLE technology (
    technology_id SERIAL PRIMARY KEY,

    profile_id INT NOT NULL,

    name VARCHAR(50),
    icon_url TEXT NOT NULL,
    display_order INT NOT NULL,

    FOREIGN KEY (profile_id) REFERENCES profile(profile_id)
);