-- Retrieve published blog posts
SELECT * FROM blog_post bp
LEFT JOIN blog_author ba on bp.author_id = ba.id
LEFT JOIN blog_post_status bps on bp.status_id = bps.id
WHERE bps.status = 'PUBLISHED';