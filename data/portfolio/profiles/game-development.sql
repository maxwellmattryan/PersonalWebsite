INSERT INTO portfolio_profile(id, status_id, name, tagline, landing, about, image_url)
VALUES ('LHIC24',
        'G3SU5I',
       'Game Development',
       'I write code and design audio for video games.',
       'I''m a software engineer based in Austin, TX. I enjoy developing games, whether it''s systems and mechanics or audio programming and technical sound design.',
       'I strive to develop both immersive audio and clean and neatly architectured code for video games. This pertains to things such as systems, mechanics, audio implementation, and more. I find the fact that each and every game is different is what makes the entire process so enjoyable and informative.',
       'images/portfolio/profiles/portrait.webp');

INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('LHIC24', 'C#', 1);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('LHIC24', 'Unity', 2);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('LHIC24', 'FMOD Studio API', 3);
INSERT INTO portfolio_profile_technology(profile_id, name, display_order) VALUES ('LHIC24', 'FMOD Studio Low-level API', 4);

-- CAUTION: Make sure project data is loaded before running
-- Game Development
INSERT INTO portfolio_profile_projects_portfolio_project(portfolio_profile_id, portfolio_project_id) VALUES ('LHIC24', 'AMIBQH'), ('LHIC24', 'WTWJN9'), ('LHIC24', '45G83G');