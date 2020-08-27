INSERT INTO admin(admin_id, username, password) VALUES (1, 'admin', 'password');

INSERT INTO blog_author(blog_author_id, first_name, last_name) VALUES (1, 'Matthew', 'Maxwell');

INSERT INTO blog_post_status(blog_post_status_id, status) VALUES (1, 'DRAFT');
INSERT INTO blog_post_status(blog_post_status_id, status) VALUES (2, 'PUBLISHED');

INSERT INTO blog_post(blog_post_id, blog_author_id, blog_post_status_id, title, preview, content, image_url)
VALUES (1,
       1,
       2,
       'The Constraints of Audio Programming',
       'Programming for audio software is such a fascinating problem domain and requires some interesting ways of thinking to write optimal code.',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.<br>```router.put(''/posts/:uri'', passport.authenticate(''jwt'', { session: false }), (req, res, next) => {    const postData = {        _id:            req.body._id || new mongoose.Types.ObjectId(),        uri:            req.body.uri,        title:          req.body.title,         subtitle:       req.body.subtitle,        topics:         req.body.topics,        author:         req.body.author,        description:    req.body.description,        content:        req.body.content,        imageURL:       req.body.imageURL,        updated:        Date.now()    };    Profile.updateMany({}, {$addToSet: {posts: postData._id}}, (err, result) => {        if(err) throw err;    });    Topic.updateMany({}, {$pull: {posts: postData._id}}, (err, result) => {        if(err) throw err;    });    Topic.updateMany({_id: {$in: postData.topics}}, {$push: {posts: postData._id}}, (err, result) => {        if(err) throw err;    });    Post.updateOne({_id: postData._id}, postData, (err, result) => {        if(err) throw err;        if(result.nModified === 0) {            const newPost = new Post({                ...postData,                created: Date.now()            });            newPost.save((err, post) => {                if(err) {                    res.sendStatus(400);                } else {                        res.sendStatus(201);                }            });        } else {            res.sendStatus(200);        }    });});```<br>Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'rotor.png');

INSERT INTO blog_post(blog_post_id, blog_author_id, blog_post_status_id, title, preview, content, image_url)
VALUES (2,
       1,
       1,
       'Making a Game for the 2019 Global Game Jam',
       'Making a game for a game jam is quite an intense experience, but is beyond rewarding if you''re willing to learn new skills or hone some old ones.',
       'Operation H.O.M.E. (''Heck Off My Earth'') is a simple arcade shooter created for the 2019 Global Game Jam. The theme of the jam was ''home'' and what it represents to you. Does home mean a location, sound, smell, or feeling? My team decided that for us it meant defending the Earth from invading aliens.<br>```void RotorAudioProcessor::processBlock(AudioBuffer<float>& buffer, MidiBuffer& midiMessages){    if (previousPulseWidth != *pulseWidth)    {        previousPulseWidth = *pulseWidth;        setWavetable((int) *modulationShape);    }    if (previousShape != *modulationShape)    {        previousShape = *modulationShape;        setWavetable((int) *modulationShape);    }    setPhaseDelta((double) *modulationRate, this->getSampleRate());    modulationInversionFactor = getModulationInversion((bool) *modulationIsInverted);    RotorAudioProcessorEditor* editor = static_cast<RotorAudioProcessorEditor*>(getActiveEditor());    if (editor)        editor->preAnalyzer->pushBuffer(buffer);    for (auto sample = 0; sample < buffer.getNumSamples(); sample++)    {        currentPhase = previousPhase;        auto* samples = buffer.getWritePointer(0);        auto o_sampleData = samples[sample], p_sampleData = samples[sample];        p_sampleData *= (wavetable[(int) currentPhase] * modulationInversionFactor);        currentPhase = fmod(currentPhase + phaseDelta, wavetableSize);        auto currentDryWet = *mix / 100.0f;        p_sampleData *= currentDryWet;        o_sampleData *= (1.0f - currentDryWet);        auto n_sampleData = p_sampleData * Random::getSystemRandom().nextFloat();        n_sampleData *= *modulationNoise;        p_sampleData *= (1.0f - *modulationNoise);        p_sampleData += n_sampleData;        auto r_sampleData = p_sampleData + o_sampleData;        for (auto channel = 0; channel < buffer.getNumChannels(); channel++)            buffer.setSample(channel, sample, r_sampleData);        previousPhase = currentPhase;    }    auto currentGain = powf(2, *level / 6);    if (previousLevel == currentGain)    {        buffer.applyGain(currentGain);    }    else    {        buffer.applyGainRamp(0, buffer.getNumSamples(), previousLevel, currentGain);        previousLevel = currentGain;    }    if (editor)        editor->postAnalyzer->pushBuffer(buffer);}```<br>  Rotor is a variable waveform ring modulation plugin targeting VST3 and AU for OS X and Windows platforms. It uses wavetable synthesis to generate various simple waveforms that act as the modulation signal for the input. It is compiled using the [JUCE](https://juce.com/) framework for C++.<br> To see it in action, make sure to check out the [demo](https://drive.google.com/file/d/1szT238kz2ZAgqB3uCJYZRtq_IYkcSJrz/view?usp=sharing).<br> ## Dependencies<br> - JUCE (v5.4.7)- VST3 SDK (v3.6.14)<br> ## Usage<br> Rotor is capable of running within any plugin host as long as it supports VST3 or AU. Please refer to your DAW''s manual to see compatible plugin formats.<br> ### Parameters<br> - __Shape__: Selects the waveform to use as the modulation signal. Included are sine, triangle, sawtooth, square, and noise waveforms. The plugin defaults to a sine wave.<br> - __Rate__: Changes the frequency of the modulation signal within the range of 10Hz to 12kHz. The default rate is 500Hz.<br> - __Noise__: Control amplitude of random noise from 0.0 to 1.0 (basically the noise''s gain multiplier). The default value is 0.0, which is zero noise.<br> - __Pulse Width__: Determines the interval between the rise and fall of a pulse, most commonly associated with square waves. The default value is 0.5 resulting in an even pulsation. _This parameter only affects the square wave._<br> - __Invert__: Sets the inversion of the modulation signal, which can sometimes lead to interesting phase cancellations with the original input. The default is a non-inverted modulation.<br> - __Mix__: Adjusts the output signal''s ratio between dry and wet. The default value is 50%.<br> - __Level__: Controls the final output level of the plugin. The default is set to 0.0dB.<br> ## Contributing<br> Should you discover any bugs or undesirable behavior, please feel free to open an issue or submit a pull request. I am happy to accept them as long as they don''t alter product direction, otherwise I am completely open to discuss any ideas that you may have regarding Rotor.<br> ### Building<br> Rotor is built using the JUCE framework, which graciously provides project files for various IDEs.<br> For Windows users, simply navigate to `Builds/VisualStudio2019/Rotor.sln` then build either of the two available configurations. Similarly, OS X users may navigate to `Builds/MACOSX/Rotor.xcodeproj` and build using XCode.<br> If you have any issues building the plugin, please contact me or file an issue.',
       'operation-home.png');

INSERT INTO blog_post(blog_post_id, blog_author_id, blog_post_status_id, title, preview, content, image_url)
VALUES (3,
       1,
       1,
       'My First Internship Experience',
       'This post is going to be about going through my first internship experience and the things I learned throughout the process.',
       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus urna neque viverra justo nec ultrices. Nunc faucibus a pellentesque sit amet porttitor eget dolor morbi. Libero enim sed faucibus turpis in eu mi bibendum neque. Id aliquet risus feugiat in. Tortor at auctor urna nunc id. Eu turpis egestas pretium aenean. Suspendisse sed nisi lacus sed viverra tellus in. Quis commodo odio aenean sed. Non arcu risus quis varius quam quisque id diam vel.<br>```router.put(''/posts/:uri'', passport.authenticate(''jwt'', { session: false }), (req, res, next) => {    const postData = {        _id:            req.body._id || new mongoose.Types.ObjectId(),        uri:            req.body.uri,        title:          req.body.title,         subtitle:       req.body.subtitle,        topics:         req.body.topics,        author:         req.body.author,        description:    req.body.description,        content:        req.body.content,        imageURL:       req.body.imageURL,        updated:        Date.now()    };    Profile.updateMany({}, {$addToSet: {posts: postData._id}}, (err, result) => {        if(err) throw err;    });    Topic.updateMany({}, {$pull: {posts: postData._id}}, (err, result) => {        if(err) throw err;    });    Topic.updateMany({_id: {$in: postData.topics}}, {$push: {posts: postData._id}}, (err, result) => {        if(err) throw err;    });    Post.updateOne({_id: postData._id}, postData, (err, result) => {        if(err) throw err;        if(result.nModified === 0) {            const newPost = new Post({                ...postData,                created: Date.now()            });            newPost.save((err, post) => {                if(err) {                    res.sendStatus(400);                } else {                        res.sendStatus(201);                }            });        } else {            res.sendStatus(200);        }    });});```<br>Sed adipiscing diam donec adipiscing tristique. Interdum velit euismod in pellentesque massa. Ultricies lacus sed turpis tincidunt id aliquet risus feugiat in. Posuere urna nec tincidunt praesent semper feugiat nibh sed pulvinar. Facilisi cras fermentum odio eu feugiat pretium nibh ipsum. Mattis molestie a iaculis at. Amet porttitor eget dolor morbi non. Elit scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus. Ut morbi tincidunt augue interdum velit. Vel quam elementum pulvinar etiam non quam. Vulputate odio ut enim blandit volutpat maecenas volutpat. Sollicitudin nibh sit amet commodo nulla facilisi nullam vehicula. Convallis posuere morbi leo urna molestie at elementum eu. Condimentum mattis pellentesque id nibh tortor id aliquet lectus. Amet venenatis urna cursus eget nunc scelerisque viverra mauris.',
       'green-foot.png');

INSERT INTO blog_topic(blog_topic_id, name, description) VALUES (1, 'Audio Development', 'Any and all things related to audio development and audio programming.');
INSERT INTO blog_topic(blog_topic_id, name, description) VALUES (2, 'Design', 'Any and all things related to software design.');
INSERT INTO blog_topic(blog_topic_id, name, description) VALUES (3, 'Engineering', 'Any and all things related to software engineering.');
INSERT INTO blog_topic(blog_topic_id, name, description) VALUES (4, 'Game Development', 'Any and all things related to game development.');
INSERT INTO blog_topic(blog_topic_id, name, description) VALUES (5, 'Mathematics', 'Any and all things related to mathematics (most likely DSP-related concepts).');
INSERT INTO blog_topic(blog_topic_id, name, description) VALUES (6, 'Programming', 'Any and all things related to programming.');

INSERT INTO blog_post_topic_mapping(blog_post_id, blog_topic_id) VALUES (1, 1);
INSERT INTO blog_post_topic_mapping(blog_post_id, blog_topic_id) VALUES (2, 4);
INSERT INTO blog_post_topic_mapping(blog_post_id, blog_topic_id) VALUES (3, 3);

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

INSERT INTO project(id, name, tagline, description, image_url, external_url)
VALUES (1,
       'Counterplay',
       'Grid-based strategy game',
       'Counterplay is a team project for the class, Video Game Systems Design (AET 334M), that demonstrates a unique intersection of primary, secondary, and progression systems. The purpose of the class is to gain a perspective of how video game systems shape an entire game''s basis of gameplay through building an implementation.',
       'counterplay.png',
       'https://github.com/zero-sum-games/counterplay');
INSERT INTO project(id, name, tagline, description, image_url, external_url)
VALUES (2,
       'Cozy Cat Cafe',
       'Mellow game for feeding cats',
       'Cozy Cat Cafe is an incredibly relaxing and chill game also created for the 2019 Global Game Jam where it won best of show. You indefinitely feed cats that appear on your patio doorstep in exchange for acorns. These acorns can be used to customize your kitchen by installing new walls or floors, hanging posters, and more.',
       'cozy-cat-cafe.png',
       'https://github.com/VeryBester/Cozy-Cat-Cafe');
INSERT INTO project(id, name, tagline, description, image_url, external_url)
VALUES (3,
       'Green Foot',
       'ReactJS application that helps reduce carbon footprints',
       'Green Foot is an environmentally conscious app concerned with helping you lower your carbon footprint. Provided a starting and target location by the user, it returns a list of modes of transportation ranked in increasing order according to their carbon emission amount.',
       'green-foot.png',
       'https://github.com/Diversity-Hackathon/greenfoot-frontend');
INSERT INTO project(id, name, tagline, description, image_url, external_url)
VALUES (4,
       'Operation H.O.M.E.',
       'Arcade shooter made in Unity',
       'Operation H.O.M.E. (''Heck Off My Earth'') is a simple arcade shooter created for the 2019 Global Game Jam. The theme of the jam was ''home'' and what it represents to you. Does home mean a location, sound, smell, or feeling? My team decided that for us it meant defending the Earth from invading aliens.',
       'operation-home.png',
       'https://github.com/maxwellmattryan/operation-home');
INSERT INTO project(id, name, tagline, description, image_url, external_url)
VALUES (5,
       'Rotor',
       'Modern C++ ring modulation plugin',
       'Rotor is a variable waveform ring modulation plugin targeting VST3 and AU for OS X and Windows platforms. It uses wavetable synthesis to generate various simple waveforms that act as the modulation signal for the input. It is compiled using the JUCE framework for C++.',
       'rotor.png',
       'https://github.com/maxwellmattryan/rotor');

INSERT INTO profile_project_mapping(profile_id, project_id) VALUES (1, 2), (1, 4), (1, 5);
INSERT INTO profile_project_mapping(profile_id, project_id) VALUES (2, 1), (2, 2), (2, 4);
INSERT INTO profile_project_mapping(profile_id, project_id) VALUES (3, 1), (3, 3), (3, 5);

INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (1, 1, 'C++', 'cpp.svg', 1);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (2, 1, 'JUCE', 'juce.svg', 2);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (3, 2, 'C#', 'c-sharp.svg', 1);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (4, 2, 'Unity', 'unity.svg', 2);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (5, 3, 'TypeScript', 'typescript.svg', 1);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (6, 3, 'Angular', 'angular.svg', 2);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (7, 3, 'JavaScript (ES6+)', 'javascript.svg', 3);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (8, 3, 'React & Redux', 'react.svg', 4);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (9, 3, 'Scala', 'scala.svg', 5);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (10, 3, 'Play', 'play.svg', 6);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (11, 3, 'Express', 'express.svg', 7);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (12, 3, 'Node', 'node.svg', 8);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (13, 3, 'MySQL', 'mysql.svg', 9);
INSERT INTO technology(technology_id, profile_id, name, icon_url, display_order) VALUES (14, 3, 'MongoDB', 'mongodb.svg', 10);