CREATE DATABASE gt_ft_nov_8;

CREATE TABLE IF NOT EXISTS notes (
	id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
	title VARCHAR(250),
	details TEXT,
	created_at timestamp NOT NULL DEFAULT current_timestamp, 
	updated_at timestamp NOT NULL DEFAULT current_timestamp
);