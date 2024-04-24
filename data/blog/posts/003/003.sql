INSERT INTO blog_post(id, author_id, status_id, title, subtitle, preview, content, image_url, created_at, updated_at)
VALUES ('Z5XU26',
        'I20ITR',
        'VKVOPU',
        'Creating a Continuous Integration (CI) Pipeline for JUCE Plugins',
        'A consistent way to guarantee painless code merges',
        'A continuous integration (CI) pipeline is crucial for creating an environment where developers can work on creating new features without having to worry about how their individual changes will be integrated into the codebase.',
        'MARKDOWN HERE',
        'assets/images/blog/003/cmake-juce.webp',
        '2023-11-15 20:23:37.026956',
        '2023-11-18 20:23:37.026956');

INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES ('Z5XU26', '97TGIW'), ('Z5XU26', 'AB6X6R');
