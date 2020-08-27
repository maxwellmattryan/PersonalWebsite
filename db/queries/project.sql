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