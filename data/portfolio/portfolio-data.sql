-- Profile Statuses
INSERT INTO portfolio_profile_status(id, status) VALUES ('9CI7WO', 'ACTIVE');
INSERT INTO portfolio_profile_status(id, status) VALUES ('G3SU5I', 'INACTIVE');

-- Bloom Project
INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('KV66DJ',
        'Bloom',
        'Web3 cryptocurrency wallet application',
        'bloom.md',
        'images/portfolio/projects/bloom.webp',
        'GitHub',
        'https://github.com/bloomwalletio/bloom');

-- Firefly Project
-- INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
-- VALUES ('7UBH3P',
--         'Firefly',
--         'Cross-platform cryptocurrency wallet',
--         'firefly.md',
--         'images/portfolio/projects/firefly.webp',
--         'GitHub',
--         'https://github.com/iotaledger/firefly');

-- Phantom Project
INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('CC5STB',
        'Phantom',
        'Modern C++ phase distortion synthesizer plugin',
        'phantom.md',
        'images/portfolio/projects/phantom.webp',
        'GitHub',
        'https://github.com/blackboxdsp/phantom');

-- Rotor Project
INSERT INTO portfolio_project(id, name, tagline, description, image_url, link_name, link_url)
VALUES ('EPTXIK',
        'Rotor',
        'Modern C++ ring modulation effect plugin',
        'rotor.md',
        'images/portfolio/projects/rotor.webp',
        'GitHub',
        'https://github.com/blackboxdsp/rotor');

-- Audio Developer Profile
INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('3BGYIH',
        'G3SU5I',
       'Audio Developer',
       'I make noises happen through code.',
       'I''m a software engineer based in Austin, TX. I love to build and develop software as it relates to audio, such as effect and synthesis plugins, digital signal processing, video game audio, microchips, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. I find its constraints to be fun and humbling, especially when coupled with my background in instrumental percussion and music production. Modifying digital signals of sound is an interesting concept that I find worth exploring.',
       'images/portfolio/profiles/portrait.webp');

-- Audio Developer Profile Technologies
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('EV9SAP', '3BGYIH', 'C++', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('DJHJ37', '3BGYIH', 'JUCE', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('S9HDUT', '3BGYIH', 'C#', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('N49J8M', '3BGYIH', 'Unity', 4);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('Z98Y7Q', '3BGYIH', 'FMOD Studio API', 5);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('S9DR3K', '3BGYIH', 'FMOD Studio Low-level API', 6);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('4H5ATG', '3BGYIH', 'MaxMSP / Max for Live', 7);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('MJ9NYE', '3BGYIH', 'Supercollider', 8);

-- Audio Developer Profile-Project Mappings
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('3BGYIH', 'CC5STB'), ('3BGYIH', 'EPTXIK');
-- -- -- -- --

-- Blockchain Developer Profile
INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('5JKLFR',
        'G3SU5I',
        'Blockchain Developer',
        'I build decentralized software on top of blockchain protocols.',
        'I''m a software engineer and blockchain developer based in Austin, TX.',
        'I write cool code.',
        'images/portfolio/profiles/portrait.webp');

-- Blockchain Developer Profile Technologies
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('F34902', '5JKLFR', 'TypeScript / JavaScript', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('1D35B7', '5JKLFR', 'Webpack', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('C729F4', '5JKLFR', '', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('73D694', '5JKLFR', 'Unity', 4);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('9677CS', '5JKLFR', 'FMOD Studio API', 5);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('BF1D35', '5JKLFR', 'FMOD Studio Low-level API', 6);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('EF8255', '5JKLFR', 'MaxMSP / Max for Live', 7);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('E1B7BD', '5JKLFR', 'Supercollider', 8);

-- Blockchain Developer Profile-Project Mappings
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('5JKLFR', 'KV66DJ');
-- -- -- -- --

-- Software Engineer Profile
INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('BZ3NMN',
        '9CI7WO',
       'Software Engineer',
       'Crafting seamless full-stack experiences in the cloud.',
       'Building software isn''t just a job; it''s an opportunity to shape a better world. Let''s connect and explore how we can make a difference together!',
       CONCAT('Based in Austin, TX, I thrive on the dynamic challenges full-stack web development. Whether it''s crafting responsive front-end experiences, architecting scalable backend systems, or fine-tuning databases and cloud infrastructure, I deliver robust solutions that drive business growth.', CHR(13), CHR(10), CHR(13), CHR(10), 'My approach blends technical finesse with an entrepreneurial mindset. I''ve navigated roles that demanded varied expertise - architecting and designing solutions for many problems that haven''t been solved yet, designing and iterating back and forth on product requirements, and being a thorough QA tester when a product is nearing a new release.'),
       'images/portfolio/profiles/portrait.webp');

-- Software Engineer Profile Technologies
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('MB9ZB3', 'BZ3NMN', 'TypeScript / JavaScript', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('S98JXD', 'BZ3NMN', 'Webpack', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('4XPFXH', 'BZ3NMN', 'Python', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('MGR3VH', 'BZ3NMN', 'Rust / C++', 4);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('Q4AH6M', 'BZ3NMN', 'NodeJS', 5);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('F6JQGX', 'BZ3NMN', 'NestJS / Express', 6);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('SV68DM', 'BZ3NMN', 'PostgreSQL', 7);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('9RHU3W', 'BZ3NMN', 'MongoDB', 8);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('EPW825', 'BZ3NMN', 'Google Cloud', 9);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('9X82GS', 'BZ3NMN', 'AWS', 10);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('ML6PS3', 'BZ3NMN', 'Electron', 11);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('4PW3BU', 'BZ3NMN', 'JUCE', 12);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('SJSF38', 'BZ3NMN', 'Amplitude', 13);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('DL2Q3Y', 'BZ3NMN', 'Sentry', 14);

-- Software Engineer Profile-Project Mappings
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('BZ3NMN', 'CC5STB'), ('BZ3NMN', 'EPTXIK'), ('BZ3NMN', 'KV66DJ');
-- -- -- -- --
