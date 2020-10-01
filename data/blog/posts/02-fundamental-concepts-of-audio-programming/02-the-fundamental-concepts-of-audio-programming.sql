INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url, created_at, updated_at)
VALUES (1,
        2,
        'The Fundamental Concepts of Audio Programming',
        'Writing code that represents and messes with digital audio signals',
        'Although it is ultimately a small niche within the realm of programming and software engineering as a whole, audio programming is a unique part that has not only interesting constraints for us to work within, but also endless possibilities to create interesting software and effects. To really delve into it, it''s important to understand a few fundamental concepts.',
        'MARKDOWN HERE',
        'assets/images/blog/02/signal.webp',
        '2020-09-14 01:05:29.653050',
        '2020-09-20 18:02:18.526809');

-- CAUTION: This assumes that no starter data has been entered into the data base (going off of the number in the file)
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (2, 1), (2, 3);