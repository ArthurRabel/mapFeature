#!/bin/bash

#Nota! arrumar trust
psql -U $POSTGRES_USER -d $POSTGRES_DB <<-EOSQL
    CREATE USER $API_USERNAME WITH PASSWORD '$API_PASSWORD';
    CREATE EXTENSION postgis;

    CREATE SEQUENCE global_id_sequence START WITH 1 INCREMENT BY 1;

    CREATE TABLE points (
        id INTEGER PRIMARY KEY DEFAULT nextval('global_id_sequence'),
        name VARCHAR(50),
        description VARCHAR(255),
        coordinates GEOMETRY(Point, 4326)
    );
    CREATE TABLE lines (
        id INTEGER PRIMARY KEY DEFAULT nextval('global_id_sequence'),
        name VARCHAR(50),
        description VARCHAR(255),
        coordinates GEOMETRY(LineString, 4326)
    );
    CREATE TABLE polygons (
        id INTEGER PRIMARY KEY DEFAULT nextval('global_id_sequence'),
        name VARCHAR(50),
        description VARCHAR(255),
        coordinates GEOMETRY(Polygon, 4326)
    );
    GRANT CONNECT ON DATABASE $POSTGRES_DB TO $API_USERNAME;
    GRANT DELETE, SELECT, INSERT ON TABLE points, lines, polygons TO $API_USERNAME;
    GRANT USAGE ON SEQUENCE global_id_sequence   TO $API_USERNAME;
EOSQL
