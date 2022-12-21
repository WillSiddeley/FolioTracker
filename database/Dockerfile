# Start from a base PostgreSQL image
FROM postgres:14

EXPOSE 5432

# Copy the data file into the work directory
COPY init.sql /docker-entrypoint-initdb.d/