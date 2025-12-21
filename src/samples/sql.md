---
title: SQL Sample
---

```sql
/* Testing: Keywords, Strings, and Comparison */
SELECT 
    u.user_id, 
    u.username,
    COUNT(o.id) AS order_count
FROM users AS u
LEFT JOIN orders AS o ON u.id = o.user_id
WHERE u.status = 'ACTIVE' 
  AND u.created_at >= '2023-01-01 00:00:00'
GROUP BY u.user_id, u.username
HAVING order_count > 1
ORDER BY order_count DESC;
```
