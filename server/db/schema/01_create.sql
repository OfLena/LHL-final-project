-- DROP ALL TABLES

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS recipe_tags CASCADE;
DROP TABLE IF EXISTS recipes CASCADE;
DROP TABLE IF EXISTS tags CASCADE;
DROP TABLE IF EXISTS favs CASCADE;
DROP TABLE IF EXISTS comments CASCADE;

-- CREATE TABLES

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE categories (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(225)
);

CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  tag_1 BOOLEAN NOT NULL DEFAULT FALSE,
  tag_2 BOOLEAN NOT NULL DEFAULT FALSE,
  tag_3 BOOLEAN NOT NULL DEFAULT FALSE,
  tag_4 BOOLEAN NOT NULL DEFAULT FALSE,
  tag_5 BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  category_id integer REFERENCES categories(id) ON DELETE CASCADE ,
  link VARCHAR(225), 
  prep_time VARCHAR(225), 
  serving_size INTEGER, 
  image_url VARCHAR(225) NOT NULL, 
  title VARCHAR(225) NOT NULL,
  instruction_1 VARCHAR(225),
  instruction_2 VARCHAR(225),
  instruction_3 VARCHAR(225),
  instruction_4 VARCHAR(225),
  instruction_5 VARCHAR(225),
  ingredient_1 VARCHAR(225),
  ingredient_2 VARCHAR(225),
  ingredient_3 VARCHAR(225),
  ingredient_4 VARCHAR(225),
  ingredient_5 VARCHAR(225),
  ingredient_6 VARCHAR(225),
  ingredient_7 VARCHAR(225),
  ingredient_8 VARCHAR(225),
  ingredient_9 VARCHAR(225),
  ingredient_10 VARCHAR(225),
  ingredient_11 VARCHAR(225),
  ingredient_12 VARCHAR(225),
  ingredient_13 VARCHAR(225),
  ingredient_14 VARCHAR(225),
  ingredient_15 VARCHAR(225),
  ingredient_16 VARCHAR(225),
  ingredient_17 VARCHAR(225),
  ingredient_18 VARCHAR(225),
  ingredient_19 VARCHAR(225),
  ingredient_20 VARCHAR(225),
  measurement_1 VARCHAR(225),
  measurement_2 VARCHAR(225),
  measurement_3 VARCHAR(225),
  measurement_4 VARCHAR(225),
  measurement_5 VARCHAR(225),
  measurement_6 VARCHAR(225),
  measurement_7 VARCHAR(225),
  measurement_8 VARCHAR(225),
  measurement_9 VARCHAR(225),
  measurement_10 VARCHAR(225),
  measurement_11 VARCHAR(225),
  measurement_12 VARCHAR(225),
  measurement_13 VARCHAR(225),
  measurement_14 VARCHAR(225),
  measurement_15 VARCHAR(225),
  measurement_16 VARCHAR(225),
  measurement_17 VARCHAR(225),
  measurement_18 VARCHAR(225),
  measurement_19 VARCHAR(225),
  measurement_20 VARCHAR(225)
); 

CREATE TABLE recipe_tags (
  id SERIAL PRIMARY KEY,
  recipe_id integer REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  tag_id integer REFERENCES tags(id) ON DELETE CASCADE NOT NULL
);


CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  recipe_id integer REFERENCES recipes(id) ON DELETE CASCADE NOT NULL,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  comment TEXT
);


CREATE TABLE favs (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  recipe_id integer REFERENCES recipes(id) ON DELETE CASCADE NOT NULL
);