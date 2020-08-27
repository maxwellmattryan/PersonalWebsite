-- Checks if profile exists, use for updating statuses
SELECT exists(SELECT 1 from profile WHERE id = ?);

-- Activates a particular profile while deactivating all others (relies on status 1 = 'ACTIVE' and status 2 = 'INACTIVE')
-- CAUTION: Does not check if profile with given id exists
UPDATE profile p
SET status_id = CASE WHEN p.id = ? THEN 1 ELSE 2 END;

WITH updated_profiles AS (
    UPDATE profile
    SET status_id = CASE WHEN id = ? THEN 1 ELSE 2 END
    RETURNING id, status_id, name, tagline, landing, about, created_at, updated_at
)
SELECT * FROM updated_profiles up
WHERE up.id = ?;
