# homepage (getting data for the profile and projects)
SELECT ps.status,
       prf.tagline,
       prf.landing,
       prf.about
FROM profile prf
LEFT JOIN profile_status ps ON prf.profile_status_id = ps.profile_status_id
WHERE ps.status = 'ACTIVE';

SELECT prj.name,
       prj.tagline,
       prj.description,
       prj.image_url,
       prj.external_url
FROM project prj
INNER JOIN profile_project_mapping ppm ON ppm.project_id = prj.project_id
INNER JOIN (
    SELECT p.profile_id
    FROM profile p
    LEFT JOIN profile_status ps ON p.profile_status_id = ps.profile_status_id
    WHERE ps.status = 'ACTIVE'
    ) prf ON prf.profile_id = ppm.profile_id;

# general blog request
SELECT CONCAT(ba.first_name, ' ', ba.last_name) AS author,
       bt.name AS topic,
       bps.status,
       bp.title,
       bp.preview,
       bp.image_url,
       bp.published_at
FROM blog_post bp
INNER JOIN blog_post_topic_mapping bptm ON bp.blog_post_id = bptm.blog_post_id
INNER JOIN blog_topic bt ON bt.blog_topic_id = bptm.blog_topic_id
LEFT JOIN blog_post_status bps ON bp.blog_post_status_id = bps.blog_post_status_id
LEFT JOIN blog_author ba ON bp.blog_author_id = ba.blog_author_id
WHERE bps.status = 'PUBLISHED';