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


CREATE TABLE recipes (
  id SERIAL PRIMARY KEY,
  user_id integer REFERENCES users(id) ON DELETE CASCADE,
  category_id integer REFERENCES categories(id) ON DELETE CASCADE,
  link VARCHAR(225), 
  prep_time VARCHAR(225), 
  serving_size VARCHAR(225), 
  image_url VARCHAR(225) NOT NULL, 
  title VARCHAR(225) NOT NULL,
  instruction_1 VARCHAR(225) DEFAULT NULL,
  instruction_2 VARCHAR(225) DEFAULT NULL,
  instruction_3 VARCHAR(225) DEFAULT NULL,
  instruction_4 VARCHAR(225) DEFAULT NULL,
  instruction_5 VARCHAR(225) DEFAULT NULL,
  ingredient_1 VARCHAR(225) DEFAULT NULL,
  ingredient_2 VARCHAR(225) DEFAULT NULL,
  ingredient_3 VARCHAR(225) DEFAULT NULL,
  ingredient_4 VARCHAR(225) DEFAULT NULL,
  ingredient_5 VARCHAR(225) DEFAULT NULL,
  ingredient_6 VARCHAR(225) DEFAULT NULL,
  ingredient_7 VARCHAR(225) DEFAULT NULL,
  ingredient_8 VARCHAR(225) DEFAULT NULL,
  ingredient_9 VARCHAR(225) DEFAULT NULL,
  ingredient_10 VARCHAR(225) DEFAULT NULL,
  ingredient_11 VARCHAR(225) DEFAULT NULL,
  ingredient_12 VARCHAR(225) DEFAULT NULL,
  ingredient_13 VARCHAR(225) DEFAULT NULL,
  ingredient_14 VARCHAR(225) DEFAULT NULL,
  ingredient_15 VARCHAR(225) DEFAULT NULL,
  ingredient_16 VARCHAR(225) DEFAULT NULL,
  ingredient_17 VARCHAR(225) DEFAULT NULL,
  ingredient_18 VARCHAR(225) DEFAULT NULL,
  ingredient_19 VARCHAR(225) DEFAULT NULL,
  ingredient_20 VARCHAR(225) DEFAULT NULL,
  measurement_1 VARCHAR(225) DEFAULT NULL,
  measurement_2 VARCHAR(225) DEFAULT NULL,
  measurement_3 VARCHAR(225) DEFAULT NULL,
  measurement_4 VARCHAR(225) DEFAULT NULL,
  measurement_5 VARCHAR(225) DEFAULT NULL,
  measurement_6 VARCHAR(225) DEFAULT NULL,
  measurement_7 VARCHAR(225) DEFAULT NULL,
  measurement_8 VARCHAR(225) DEFAULT NULL,
  measurement_9 VARCHAR(225) DEFAULT NULL,
  measurement_10 VARCHAR(225) DEFAULT NULL,
  measurement_11 VARCHAR(225) DEFAULT NULL,
  measurement_12 VARCHAR(225) DEFAULT NULL,
  measurement_13 VARCHAR(225) DEFAULT NULL,
  measurement_14 VARCHAR(225) DEFAULT NULL,
  measurement_15 VARCHAR(225) DEFAULT NULL,
  measurement_16 VARCHAR(225) DEFAULT NULL,
  measurement_17 VARCHAR(225) DEFAULT NULL,
  measurement_18 VARCHAR(225) DEFAULT NULL,
  measurement_19 VARCHAR(225) DEFAULT NULL,
  measurement_20 VARCHAR(225) DEFAULT NULL,
  vegan BOOLEAN NOT NULL DEFAULT FALSE,
  vegetarian BOOLEAN NOT NULL DEFAULT FALSE,
  keto BOOLEAN NOT NULL DEFAULT FALSE,
  breakfast BOOLEAN NOT NULL DEFAULT FALSE,
  lunch BOOLEAN NOT NULL DEFAULT FALSE,
  dinner BOOLEAN NOT NULL DEFAULT FALSE,
  gluten_free BOOLEAN NOT NULL DEFAULT FALSE,
  dairy_free BOOLEAN NOT NULL DEFAULT FALSE
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

