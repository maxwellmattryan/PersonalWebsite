INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('BZ3NMN',
        'G3SU5I',
       'Software Engineering',
       'I develop fullstack applications for the cloud.',
       'I''m a software engineer based in Austin, TX. I love working on all sides of web development, whether it involves the front-end, back-end, database, or infrastructure.',
       'I strive to develop clean and neatly architectured software for the web. I have experience ranging from developing simple single-page applications to working in complex enterprise-level solutions within a functional programming paradigm. I enjoy the process of software development and learning new concepts that allow the product to come to fruition.',
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'TypeScript', 1);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Angular', 2);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'NestJS', 3);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Node', 4);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Scala', 5);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Play', 6);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'PostgreSQL', 7);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Google Cloud Platform', 8);

-- CAUTION: Make sure project data is loaded before running
-- Software Engineering
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('BZ3NMN', 'EPTXIK'), ('BZ3NMN', 'AMIBQH');