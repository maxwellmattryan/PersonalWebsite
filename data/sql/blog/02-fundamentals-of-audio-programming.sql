INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url, created_at)
VALUES (1,
        1,
        'The Fundamentals of Audio Programming',
        'Writing code that represents and messes with digital audio signals',
        'Although it is ultimately a small niche within the realm of programming and software engineering as a whole, audio programming is a unique part that has not only interesting constraints for us to work within, but also endless possibilities to create interesting software and effects.',
        '# What is Audio?

<br>

This is going to be an interesting blog post to write. I need to write the outline first though...',
        -- CAUTION: Make sure to change later once image is made
        'assets/images/projects/rotor.png',
        '2020-09-14 01:05:29.653050');

-- CAUTION: This assumes that no starter data has been entered into the data base (going off of the number in the file)
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (2, 1), (2, 4);