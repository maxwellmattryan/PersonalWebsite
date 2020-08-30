-- Retrieve published blog posts
SELECT * FROM blog_post bp
LEFT JOIN blog_author ba ON bp.author_id = ba.id
LEFT JOIN blog_post_status bps ON bp.status_id = bps.id
WHERE bps.status = 'PUBLISHED';

-- Retrieve published blog posts with topics
SELECT * FROM blog_post_topic_mapping bptm
LEFT JOIN (
    SELECT bp.* FROM blog_post bp
    LEFT JOIN blog_author ba ON bp.author_id = ba.id
    LEFT JOIN blog_post_status bps ON bp.status_id = bps.id
    WHERE bps.status = 'PUBLISHED'
) bp ON bptm.post_id = bp.id
LEFT JOIN blog_topic bt on bptm.topic_id = bt.id;