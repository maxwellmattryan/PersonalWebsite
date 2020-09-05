INSERT INTO project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Counterplay',
       'Grid-based strategy game',
       'Counterplay is a team project for the class, Video Game Systems Design (AET 334M), that demonstrates a unique intersection of primary, secondary, and progression systems. The purpose of the class is to gain a perspective of how video game systems shape an entire game''s basis of gameplay through building an implementation.',
       'https://mattmaxwell.tech/images/counterplay.png',
       'GitHub',
       'https://github.com/zero-sum-games/counterplay');

INSERT INTO project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Cozy Cat Cafe',
       'Mellow game for feeding cats',
       'Cozy Cat Cafe is an incredibly relaxing and chill game also created for the 2019 Global Game Jam where it won best of show. You indefinitely feed cats that appear on your patio doorstep in exchange for acorns. These acorns can be used to customize your kitchen by installing new walls or floors, hanging posters, and more.',
       'https://mattmaxwell.tech/images/cozy-cat-cafe.png',
       'GitHub',
       'https://github.com/VeryBester/Cozy-Cat-Cafe');

INSERT INTO project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Green Foot',
       'ReactJS application that helps reduce carbon footprints',
       'Green Foot is an environmentally conscious app concerned with helping you lower your carbon footprint. Provided a starting and target location by the user, it returns a list of modes of transportation ranked in increasing order according to their carbon emission amount.',
       'https://mattmaxwell.tech/images/green-foot.png',
       'GitHub',
       'https://github.com/Diversity-Hackathon/greenfoot-frontend');

INSERT INTO project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Operation H.O.M.E.',
       'Arcade shooter made in Unity',
       'Operation H.O.M.E. (''Heck Off My Earth'') is a simple arcade shooter created for the 2019 Global Game Jam. The theme of the jam was ''home'' and what it represents to you. Does home mean a location, sound, smell, or feeling? My team decided that for us it meant defending the Earth from invading aliens.',
       'https://mattmaxwell.tech/images/operation-home.png',
       'GitHub',
       'https://github.com/maxwellmattryan/operation-home');

INSERT INTO project(name, tagline, description, image_url, link_name, link_url)
VALUES ('Rotor',
       'Modern C++ ring modulation plugin',
       'Rotor is a variable waveform ring modulation plugin targeting VST3 and AU for OS X and Windows platforms. It uses wavetable synthesis to generate various simple waveforms that act as the modulation signal for the input. It is compiled using the JUCE framework for C++.',
       'https://mattmaxwell.tech/images/rotor.png',
       'GitHub',
       'https://github.com/maxwellmattryan/rotor');

-- CAUTION: Make sure profile starter data is loaded before running
INSERT INTO profile_projects_project(profile_id, project_id) VALUES (1, 2), (1, 4), (1, 5);
INSERT INTO profile_projects_project(profile_id, project_id) VALUES (2, 1), (2, 2), (2, 4);
INSERT INTO profile_projects_project(profile_id, project_id) VALUES (3, 1), (3, 3), (3, 5);