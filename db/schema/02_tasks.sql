-- Drop and recreate tasks table (Example)

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL
)