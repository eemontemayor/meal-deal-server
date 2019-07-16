

CREATE TABLE "meal" (
  "id" SERIAL PRIMARY KEY,
  "meal_name" TEXT NOT NULL,
  "on_day" DATE, 
  "ingredients" TEXT,
  image TEXT,
  "date_created" TIMESTAMP DEFAULT now() NOT NULL,
  "bookmarked" BOOLEAN,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);

CREATE TABLE "bookmark" (
  "id" SERIAL PRIMARY KEY,
  "meal_name" TEXT NOT NULL,
  "ingredients" TEXT,
  image TEXT,
  "date_created" TIMESTAMP DEFAULT now() NOT NULL,
  "bookmarked" BOOLEAN,
  "user_id" INTEGER REFERENCES "user"(id)
    ON DELETE CASCADE NOT NULL
);


