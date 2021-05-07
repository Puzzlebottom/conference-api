# Conference API

## Database commands

- Connect to database: `docker exec -it conference-api_app-postgres_1 psql -U app_dev`
- Dump schema: `docker exec -it conference-api_app-postgres_1 pg_dump -U app_dev -s app_dev > schema.sql`
- Load schema: `docker exec -i conference-api_app-postgres_1 psql -U app_dev < schema.sql`