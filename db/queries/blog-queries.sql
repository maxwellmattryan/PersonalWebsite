-- general blog request
SELECT CONCAT(ba.first_name, ' ', ba.last_name) AS author,
       bt.name AS topic,
       bps.status,
       bp.title,
       bp.preview,
       bp.image_url
FROM blog_post bp
INNER JOIN blog_post_topic_mapping bptm ON bp.blog_post_id = bptm.blog_post_id
INNER JOIN blog_topic bt ON bt.blog_topic_id = bptm.blog_topic_id
LEFT JOIN blog_post_status bps ON bp.blog_post_status_id = bps.blog_post_status_id
LEFT JOIN blog_author ba ON bp.blog_author_id = ba.blog_author_id
WHERE bps.status = 'PUBLISHED';