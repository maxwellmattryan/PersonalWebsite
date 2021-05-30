INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('3BGYIH',
        '9CI7WO',
       'Audio Development',
       'I make noises happen through code.',
       'I''m a software engineer based in Austin, TX. I love to build and develop software as it relates to audio, such as effect and synthesis plugins, digital signal processing, video game audio, microchips, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. I find its constraints to be fun and humbling, especially when coupled with my background in instrumental percussion and music production. Modifying digital signals of sound is an interesting concept that I find worth exploring.',
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('F34902', '3BGYIH', 'C++', 1);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('1D35B7', '3BGYIH', 'JUCE', 2);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('C729F4', '3BGYIH', 'C#', 3);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('73D694', '3BGYIH', 'Unity', 4);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('9677CS', '3BGYIH', 'FMOD Studio API', 5);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('BF1D35', '3BGYIH', 'FMOD Studio Low-level API', 6);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('EF8255', '3BGYIH', 'MaxMSP / Max for Live', 7);
INSERT INTO portfolio_profile_technology(id, profile_id, name, display_order) VALUES ('E1B7BD', '3BGYIH', 'Supercollider', 8);

-- CAUTION: Make sure project data is loaded before running
-- Audio Development
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('3BGYIH', 'EPTXIK'), ('3BGYIH', 'WTWJN9'), ('3BGYIH', '45G83G');