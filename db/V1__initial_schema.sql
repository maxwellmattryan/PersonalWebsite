-- Handle an 'updated_at' field for a table
CREATE FUNCTION update_updated_at_column() RETURNS trigger
        LANGUAGE plpgsql
        AS $$
    BEGIN
        NEW.updated_at = now();
        RETURN NEW;
    END;
$$;

CREATE TABLE admin (
    id SERIAL PRIMARY KEY,

    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE blog_author (
    id SERIAL PRIMARY KEY,

    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

CREATE TABLE blog_post_status (
    id SERIAL PRIMARY KEY,

    status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE blog_post (
    id SERIAL PRIMARY KEY,

    author_id INT NOT NULL,
    status_id INT NOT NULL,

    title VARCHAR(255) NOT NULL UNIQUE,
    preview TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    FOREIGN KEY (author_id) REFERENCES blog_author(id),
    FOREIGN KEY (status_id) REFERENCES blog_post_status(id)
);

CREATE TRIGGER blog_post_updated_at_modtime
    BEFORE UPDATE ON blog_post
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE blog_topic (
    id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TRIGGER blog_topic_updated_at_modtime
    BEFORE UPDATE ON blog_topic
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE blog_post_topic_mapping (
    id SERIAL PRIMARY KEY,

    post_id INT NOT NULL,
    topic_id INT NOT NULL,

    FOREIGN KEY (post_id) REFERENCES blog_post(id),
    FOREIGN KEY (topic_id) REFERENCES blog_topic(id)
);

CREATE TABLE profile_status (
    id SERIAL PRIMARY KEY,

    status VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE profile (
    id SERIAL PRIMARY KEY,

    status_id INT NOT NULL,

    name VARCHAR(50) NOT NULL UNIQUE,
    tagline TEXT NOT NULL,
    landing TEXT NOT NULL,
    about TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    FOREIGN KEY (status_id) REFERENCES profile_status(id)
);

CREATE TRIGGER profile_updated_at_modtime
    BEFORE UPDATE ON profile
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE project_link (
    id SERIAL PRIMARY KEY,

    name VARCHAR(50) NOT NULL,

    url TEXT NOT NULL
);

CREATE TABLE project (
    id SERIAL PRIMARY KEY,

    link_id INT NOT NULL,

    name VARCHAR(50) NOT NULL UNIQUE,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,

    image_url TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),

    FOREIGN KEY(link_id) REFERENCES project_link(id)
);

CREATE TRIGGER project_updated_at_modtime
    BEFORE UPDATE ON project
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TABLE project_profile_mapping (
    profile_id INT NOT NULL,
    project_id INT NOT NULL,

    FOREIGN KEY (profile_id) REFERENCES profile(id),
    FOREIGN KEY (project_id) REFERENCES project(id)
);

CREATE TABLE technology (
    id SERIAL PRIMARY KEY,

    profile_id INT NOT NULL,

    name VARCHAR(50),
    icon_url TEXT NOT NULL,
    display_order INT NOT NULL,

    FOREIGN KEY (profile_id) REFERENCES profile(id)
);