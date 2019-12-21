CREATE TABLE users (
  id UUID,
  user_name VARCHAR(50) NOT NULL UNIQUE PRIMARY KEY,
  password VARCHAR(2048) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email varchar(100) NOT NULL UNIQUE
  );