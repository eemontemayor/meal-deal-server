CREATE TABLE capstone1_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

CREATE TABLE capstone1_meals (
  id SERIAL PRIMARY KEY,
  meal_name TEXT NOT NULL,
  on_day DATE, 
  ingredients TEXT,
  image TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  bookmarked BOOLEAN
);


ALTER TABLE capstone1_meals
  ADD COLUMN
    user_id INTEGER REFERENCES capstone1_users(id)
    ON DELETE SET NULL;