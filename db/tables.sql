CREATE TABLE IF NOT EXISTS userroles (
    id BIGSERIAL PRIMARY KEY,
    role TEXT
);

CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    firstname TEXT,
    lastname TEXT,
    username TEXT UNIQUE,
    password TEXT,
	userrole BIGINT REFERENCES userroles(id)
);

CREATE TABLE IF NOT EXISTS tokens (
    id BIGSERIAL PRIMARY KEY,
    userid BIGINT REFERENCES users(id) ON DELETE CASCADE,
    token TEXT,
    expires BIGINT
)

CREATE TABLE IF NOT EXISTS trips (
    id BIGSERIAL PRIMARY KEY,
    userid BIGINT REFERENCES users(id) ON DELETE CASCADE,,
    destination TEXT,
    startDate BIGINT,
    endDate BIGINT,
    comment TEXT
);