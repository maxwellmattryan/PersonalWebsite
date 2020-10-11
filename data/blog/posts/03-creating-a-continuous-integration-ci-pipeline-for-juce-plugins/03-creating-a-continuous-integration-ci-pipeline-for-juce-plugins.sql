INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url, created_at, updated_at)
VALUES (1,
        3,
        'Creating a Continuous Integration (CI) Pipeline for JUCE Plugins',
        'A consistent way to guarantee painless code merges',
        'A continuous integration (CI) pipeline is crucial for creating an environment where developers can work on creating new features without having to worry about how their individual changes will be integrated into the codebase.',
        'MARKDOWN HERE',
        'assets/images/blog/003/cmake-juce.webp',
        '2020-10-10 20:23:37.026956',
        '2020-10-10 20:23:37.026956');

-- CAUTION: This assumes that no starter data has been entered into the data base (going off of the number in the file)
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (3, 1), (3, 6);