INSERT INTO portfolio_profile_status(id, status) VALUES ('9CI7WO', 'ACTIVE');
INSERT INTO portfolio_profile_status(id, status) VALUES ('G3SU5I', 'INACTIVE');

-- CAUTION: The following data is starter data - NOT intended for production
INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('CC5STB',
        'Phantom',
        'Modern C++ phase distortion synthesizer plugin',
        'phantom.md',
        'images/portfolio/projects/phantom.webp',
        'GitHub',
        'https://github.com/blackboxdsp/phantom');

INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('EPTXIK',
        'Rotor',
        'Modern C++ ring modulation effect plugin',
        'rotor.md',
        'images/portfolio/projects/rotor.webp',
        'GitHub',
        'https://github.com/blackboxdsp/rotor');

INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('WTWJN9',
        'Operation H.O.M.E.',
        'Arcade shooter made in Unity',
        'operation-home.md',
        'images/portfolio/projects/operation-home.webp',
        'GitHub',
        'https://github.com/maxwellmattryan/operation-home');

INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('LRJXCE',
        'Green Foot',
        'ReactJS application that helps reduce carbon footprints',
        'green-foot.md',
        'images/portfolio/projects/green-foot.webp',
        'GitHub',
        'https://github.com/Diversity-Hackathon/greenfoot-frontend');

INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('45G83G',
        'Cozy Cat Cafe',
        'Mellow game for feeding cats',
        'cozy-cat-cafe.md',
        'images/portfolio/projects/cozy-cat-cafe.webp',
        'GitHub',
        'https://github.com/VeryBester/Cozy-Cat-Cafe');

INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('AMIBQH',
        'Counterplay',
        'Grid-based strategy game',
        'counterplay.md',
        'images/portfolio/projects/counterplay.webp',
        'GitHub',
        'https://github.com/zero-sum-games/counterplay');

INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('3BGYIH',
        '9CI7WO',
       'Audio Development',
       'I make noises happen through code.',
       'I''m a software engineer based in Austin, TX. I love to build and develop software as it relates to audio, such as effect and synthesis plugins, digital signal processing, video game audio, microchips, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. I find its constraints to be fun and humbling, especially when coupled with my background in instrumental percussion and music production. Modifying digital signals of sound is an interesting concept that I find worth exploring.',
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('X4X233', '3BGYIH', 'C++', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('BCOS0C', '3BGYIH', 'JUCE', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('38DQWQ', '3BGYIH', 'C#', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('IP9GH7', '3BGYIH', 'Unity', 4);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('3Q9N76', '3BGYIH', 'FMOD Studio API', 5);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('AI49KG', '3BGYIH', 'FMOD Studio Low-level API', 6);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('6FJZ7O', '3BGYIH', 'MaxMSP / Max for Live', 7);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('E07BVM', '3BGYIH', 'Supercollider', 8);

-- CAUTION: Make sure project data is loaded before running
-- Audio Development
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('3BGYIH', 'EPTXIK'), ('3BGYIH', 'WTWJN9'), ('3BGYIH', '45G83G');

INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('LHIC24',
        'G3SU5I',
       'Game Development',
       'I write code and design audio for video games.',
       'I''m a software engineer based in Austin, TX. I enjoy developing games, whether it''s systems and mechanics or audio programming and technical sound design.',
       'I strive to develop both immersive audio and clean and neatly architectured code for video games. This pertains to things such as systems, mechanics, audio implementation, and more. I find the fact that each and every game is different is what makes the entire process so enjoyable and informative.',
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('OBD870', 'LHIC24', 'C#', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('IY1N0Q', 'LHIC24', 'Unity', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('8JT34J', 'LHIC24', 'FMOD Studio API', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('K724C0', 'LHIC24', 'FMOD Studio Low-level API', 4);

-- CAUTION: Make sure project data is loaded before running
-- Game Development
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('LHIC24', 'AMIBQH'), ('LHIC24', 'WTWJN9'), ('LHIC24', '45G83G');

INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('BZ3NMN',
        'G3SU5I',
       'Software Engineering',
       'Crafting seamless full-stack experiences in the cloud.',
       'Building software isn''t just a job; it''s an opportunity to shape a better world. Let''s connect and explore how we can make a difference together!',
       CONCAT('Based in Austin, TX, I thrive on the dynamic challenges full-stack web development. Whether it''s crafting response front-end experiences, architecting scalable backend systems, or fine-tuning databases and cloud infrastructure, I deliver robust solutions that drive business growth.', CHR(13), CHR(10), CHR(13), CHR(10), 'My approach blends technical finesse with an entrepreneurial mindset. I''ve navigated roles that demanded varied expertise - architecting and designing solutions for many problems that haven''t been solved yet, designing and iterating back and forth on product requirements, and being a thorough QA tester when a product is nearing a new release.'),
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('Z9GDWT', 'BZ3NMN', 'TypeScript', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('214808', 'BZ3NMN', 'Angular', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('01IW3G', 'BZ3NMN', 'Scala', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('KV81II', 'BZ3NMN', 'Play', 4);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('EBLXP4', 'BZ3NMN', 'NestJS', 5);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('YH2HTC', 'BZ3NMN', 'Node', 6);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('1DM2KE', 'BZ3NMN', 'PostgreSQL', 7);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('YOGJT3', 'BZ3NMN', 'Google Cloud', 8);

-- CAUTION: Make sure project data is loaded before running
-- Software Engineering
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('BZ3NMN', 'EPTXIK'), ('BZ3NMN', 'AMIBQH');
