\c events_devs;

DROP TABLE IF EXISTS events;

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    descriptions TEXT,
    pictures TEXT,
    schedule TIMESTAMP
);