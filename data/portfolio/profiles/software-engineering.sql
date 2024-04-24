INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('BZ3NMN',
        'G3SU5I',
       'Software Engineering',
       'Crafting seamless full-stack experiences in the cloud.',
       'Building software isn''t just a job; it''s an opportunity to shape a better world. Let''s connect and explore how we can make a difference together!',
       CONCAT('Based in Austin, TX, I thrive on the dynamic challenges full-stack web development. Whether it''s crafting response front-end experiences, architecting scalable backend systems, or fine-tuning databases and cloud infrastructure, I deliver robust solutions that drive business growth.', CHR(13), CHR(10), CHR(13), CHR(10), 'My approach blends technical finesse with an entrepreneurial mindset. I''ve navigated roles that demanded varied expertise - architecting and designing solutions for many problems that haven''t been solved yet, designing and iterating back and forth on product requirements, and being a thorough QA tester when a product is nearing a new release.'),
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'TypeScript / JavaScript', 1);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', '', 2);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'NestJS', 3);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Node', 4);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Scala', 5);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Play', 6);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'PostgreSQL', 7);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('BZ3NMN', 'Google Cloud Platform', 8);

-- TypeScript / JavaScript .. Webpack
-- Python .. Rust / C++
-- Svelte / Angular .. HTML, CSS (and TailwindCSS)
-- NodeJS .. NestJS / Express
-- PostgreSQL .. MongoDB
-- Google Cloud .. AWS
-- Electron .. JUCE
-- Amplitude .. Sentry

-- CAUTION: Make sure project data is loaded before running
-- Software Engineering
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('BZ3NMN', 'EPTXIK'), ('BZ3NMN', 'AMIBQH');