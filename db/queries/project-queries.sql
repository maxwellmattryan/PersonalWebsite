SELECT prj.name,
       prj.tagline,
       prj.description,
       prj.image_url,
       prj.external_url
FROM project prj
INNER JOIN project_profile_mapping ppm ON ppm.project_id = prj.id
INNER JOIN (
    SELECT p.id
    FROM profile p
    LEFT JOIN profile_status ps ON p.status_id = ps.id
    WHERE ps.status = 'ACTIVE'
    ) prf ON prf.id = ppm.profile_id;

SELECT p.* FROM profile p
LEFT JOIN project_profile_mapping ppm ON p.id = ppm.profile_id
WHERE ppm.project_id = 4;