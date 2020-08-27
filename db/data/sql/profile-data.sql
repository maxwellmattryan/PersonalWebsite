INSERT INTO profile_status(id, status) VALUES (1, 'ACTIVE');
INSERT INTO profile_status(id, status) VALUES (2, 'INACTIVE');

INSERT INTO profile(id, status_id, name, tagline, landing, about)
VALUES (1,
       2,
       'Audio Development',
       'I make noises happen through code.',
       'I''m an software engineer based in Austin, TX. I love to build and develop audio-related software, whether it''s plugins, game audio engines, and more.',
       'I strive to develop clean and optimized audio software, which in and of itself is an vastly interesting problem domain. In addition to my passion for audio, I have experience ranging from building simple audio plugins to audio middleware solutions in games.');
INSERT INTO profile(id, status_id, name, tagline, landing, about)
VALUES (2,
       2,
       'Game Development',
       'Looking for a game programmer? I''m your guy.',
       'I\m a software engineer based in Austin, TX. I enjoy developing games, whether it''s audio programming or technical sound design.',
       'I strive to develop clean and neatly architectured code for games, pertaining to things such as systems, behaviors, mechanics, and more. Each and every game is different, which makes the entire process so enjoyable and informative.');
INSERT INTO profile(id, status_id, name, tagline, landing, about)
VALUES (3,
       1,
       'Software Engineering',
       'Looking for a software engineer? I''m your guy.',
       'I''m a software engineer based in Austin, TX. I love working on all sides of web development, whether it involves the front-end, back-end, database, or cloud computing.',
       'I strive to develop clean and neatly architectured software for the web. I have experience ranging from developing simple single-page applications to working in complex enterprise-level solutions.');