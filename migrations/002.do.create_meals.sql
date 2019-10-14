

CREATE TABLE IF NOT EXISTS "meal" (
  "id" SERIAL PRIMARY KEY,
  "meal_name" TEXT NOT NULL,
  "on_day" DATE, 
  "ingredients" TEXT,
  image TEXT,
  "date_created" TIMESTAMP DEFAULT now() NOT NULL,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);

CREATE TABLE IF NOT EXISTS "bookmark" (
  "id" SERIAL PRIMARY KEY,
  "meal_name" TEXT NOT NULL,
  "ingredients" TEXT,
  image TEXT,
  "date_created" TIMESTAMP DEFAULT now() NOT NULL,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);


CREATE TABLE IF NOT EXISTS "shopping_list" (
    "id" SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
  
    "date_added" TIMESTAMP DEFAULT now() NOT NULL,
    "checked" BOOLEAN DEFAULT false,
  
);

