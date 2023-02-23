CREATE DATABASE todo;

CREATE TABLE todo_lists(
    id SERIAL PRIMARY KEY,
    list_name TEXT
);

CREATE TABLE todo_items(
    id SERIAL PRIMARY KEY,
    list_id INT,
    list_name TEXT,
    task VARCHAR(255),
    completed BOOLEAN
);