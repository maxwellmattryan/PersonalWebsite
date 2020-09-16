INSERT INTO profile_status(status) VALUES ('ACTIVE');
INSERT INTO profile_status(status) VALUES ('INACTIVE');

INSERT INTO profile(status_id, name, tagline, landing, about, image_url)
VALUES (2,
       'Audio Development',
       'I make noises happen through code.',
       'I''m a software engineer based in Austin, TX. I love to build and develop software as it relates to audio, such as effect and synthesis plugins, digital signal processing, video game audio, microchips, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. I find its constraints to be fun and humbling, especially when coupled with my background in instrumental percussion and music production. Modifying digital signals of sound is an interesting concept that I find worth exploring.',
       'assets/images/profiles/portrait.png');
INSERT INTO profile(status_id, name, tagline, landing, about, image_url)
VALUES (2,
       'Game Development',
       'I write code and design audio for video games.',
       'I''m a software engineer based in Austin, TX. I enjoy developing games, whether it''s systems and mechanics or audio programming and technical sound design.',
       'I strive to develop both immersive audio and clean and neatly architectured code for video games. This pertains to things such as systems, mechanics, audio implementation, and more. I find the fact that each and every game is different is what makes the entire process so enjoyable and informative.',
       'assets/images/profiles/portrait.png');
INSERT INTO profile(status_id, name, tagline, landing, about, image_url)
VALUES (1,
       'Software Engineering',
       'I develop fullstack applications for the cloud.',
       'I''m a software engineer based in Austin, TX. I love working on all sides of web development, whether it involves the front-end, back-end, database, or infrastructure.',
       'I strive to develop clean and neatly architectured software for the web. I have experience ranging from developing simple single-page applications to working in complex enterprise-level solutions within a functional programming paradigm. I enjoy the process of software development and learning new concepts that allow the product to come to fruition.',
       'assets/images/profiles/portrait.png');

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
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'Node', 6);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'PostgreSQL', 7);
INSERT INTO profile_technology(profile_id, name, display_order) VALUES (3, 'Google Cloud', 8);
