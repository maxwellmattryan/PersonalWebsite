INSERT INTO profile_status(status) VALUES ('ACTIVE');
INSERT INTO profile_status(status) VALUES ('INACTIVE');

INSERT INTO profile(status_id, name, tagline, landing, about, image_url)
VALUES (2,
       'Audio Development',
       'I make noises happen through code.',
       'I''m a software engineer based in Austin, TX. I love to build and develop audio-related software, whether it''s plugins, game audio engines, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. In addition to my passion for audio, I have experience ranging from building simple audio plugins to audio middleware solutions in games.',
       'assets/images/portrait.png');
INSERT INTO profile(status_id, name, tagline, landing, about, image_url)
VALUES (2,
       'Game Development',
       'Looking for a game programmer? I''m your guy.',
       'I''m a software engineer based in Austin, TX. I enjoy developing games, whether it''s audio programming or technical sound design.',
       'I strive to develop clean and neatly architectured code for games, pertaining to things such as systems, behaviors, mechanics, and more. Each and every game is different, which makes the entire process so enjoyable and informative.',
       'assets/images/portrait.png');
INSERT INTO profile(status_id, name, tagline, landing, about, image_url)
VALUES (1,
       'Software Engineering',
       'Looking for a software engineer? I''m your guy.',
       'I''m a software engineer based in Austin, TX. I love working on all sides of web development, whether it involves the front-end, back-end, database, or cloud computing.',
       'I strive to develop clean and neatly architectured software for the web. I have experience ranging from developing simple single-page applications to working in complex enterprise-level solutions.',
       'assets/images/portrait.png');

INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'C++', 1);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'JUCE', 2);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'C#', 3);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'Unity', 4);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'FMOD Studio API', 5);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'FMOD Studio Low-level API', 6);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'MaxMSP / Max for Live', 7);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (1, 'Supercollider', 8);

INSERT INTO profile_technology(profile_id, name, display_order) VALUES (2, 'C#', 1);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (2, 'Unity', 2);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (2, 'FMOD Studio API', 3);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (2, 'FMOD Studio Low-level API', 4);

INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'TypeScript', 1);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'Angular', 2);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'Scala', 3);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'Play', 4);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'NestJS', 5);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES ( 3, 'Node', 6);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES ( 3, 'PostgreSQL', 7);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES ( 3, 'Google Cloud', 8);
