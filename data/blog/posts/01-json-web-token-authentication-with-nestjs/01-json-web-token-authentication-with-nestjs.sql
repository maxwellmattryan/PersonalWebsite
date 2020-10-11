INSERT INTO blog_post(author_id, status_id, title, subtitle, preview, content, image_url, created_at, updated_at)
VALUES (1,
        2,
        'JSON Web Token (JWT) Authentication with NestJS',
        'A cookie-based approach to solving authentication',
        'Authentication is a huge concern among many when developing a web-based application. There exist multiple solutions for implementing mechanisms to authenticate users and post is an overview of the JWT-based approach.',
        'MARKDOWN HERE',
        'assets/images/blog/001/jwt.webp',
        '2020-09-12 17:16:23.119169',
        '2020-09-17 23:43:31.126472');


-- CAUTION: This assumes that no starter data has been entered into the data base (going off of the number in the file)
INSERT INTO blog_post_topics_blog_topic(blog_post_id, blog_topic_id) VALUES (1, 6);