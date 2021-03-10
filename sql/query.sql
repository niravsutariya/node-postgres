CREATE TABLE sales (
  id SERIAL PRIMARY KEY,
  userName VARCHAR(30),
  amount decimal,
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);