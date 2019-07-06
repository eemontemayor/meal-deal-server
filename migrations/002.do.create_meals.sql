

CREATE TABLE meal (
  id SERIAL PRIMARY KEY,
  meal_name TEXT NOT NULL,
  on_day DATE, 
  ingredients TEXT,
  image TEXT,
  date_created TIMESTAMP DEFAULT now() NOT NULL,
  bookmarked BOOLEAN
);


ALTER TABLE meal
  ADD COLUMN
    user_id INTEGER REFERENCES user(id),
    ON DELETE SET NULL;