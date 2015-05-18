CREATE DATABASE usersdatabase;

 \c usersdatabase;

CREATE TABLE users (
id serial NOT NULL PRIMARY KEY,
name varchar(255) NOT NULL,
access_token varchar(255) NOT NULL
);
