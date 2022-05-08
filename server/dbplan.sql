--HELPFUL QUERIES

--Dropping a column--
--  ALTER TABLE table_name
--      DROP COLUMN column_name;


--Adding a column--
--  ALTER TABLE table_name
--      ADD new_column_name column-definitions;







--MAIN DATABASE

CREATE DATABASE mcspotfi;

CREATE TABLE users(
    users_id SERIAL PRIMARY KEY,
    user_firstname VARCHAR(255),
    user_lastname VARCHAR(255),
    user_username VARCHAR(255),
    user_password VARCHAR(255)
);


CREATE TABLE blogs(
    blog_id SERIAL PRIMARY KEY,
    blog_title VARCHAR(255),
    blog_category VARCHAR(255),
    blog_search VARCHAR(255),
    blog_content TEXT,
    blog_privacy TEXT,
    blog_date DATE NOT NULL DEFAULT CURRENT_DATE,
    blog_time TIME NOT NULL DEFAULT LOCALTIME(0),
    users_id INTEGER REFERENCES users (users_id)
);


CREATE TABLE comments(
    comment_id SERIAL PRIMARY KEY,
    comment_body TEXT,
    blog_id INTEGER REFERENCES blogs (blog_id)
);


CREATE TABLE favorites(
    fav_id SERIAL PRIMARY KEY,
    blog_id INTEGER REFERENCES blogs (blog_id),
    users_id INTEGER REFERENCES users (users_id),
    blog_date DATE NOT NULL DEFAULT CURRENT_DATE,
    blog_time TIME NOT NULL DEFAULT LOCALTIME(0)
);