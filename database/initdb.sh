#!/bin/bash

#Nota! arrumar trust
psql -U $POSTGRES_USER -d $POSTGRES_DB <<-EOSQL
    CREATE USER $API_USERNAME WITH PASSWORD '$API_PASSWORD';
    CREATE EXTENSION postgis;
    CREATE TABLE features (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50),
        description VARCHAR(255),
        coordinates GEOMETRY(Geometry, 4326)
    );
    GRANT CONNECT ON DATABASE $POSTGRES_DB TO $API_USERNAME;
    GRANT DELETE, SELECT, INSERT ON TABLE features TO $API_USERNAME;
    GRANT USAGE ON SEQUENCE features_id_seq TO $API_USERNAME;
EOSQL