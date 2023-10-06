# Logs
A journal app for yourself

**Deploy**
1. Fork with Replit
2. Create a new env variable called "EXEC" with the key as 'db = Database("node_modules/logs.json")'
3. Create a new env variable called "ADMIN" with the key as your admin password
4. Run in shell `mkdir node_modules`
5. Create a `logs.json` file
6. Move it to `node_modules` using `mv logs.json node_modules`
7. Run

To log on as an admin, use the route `/admin/<your password here>`, non-admins can't make posts
