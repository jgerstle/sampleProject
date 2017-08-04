CREATE OR REPLACE FUNCTION signup(fname TEXT, lname TEXT, uname TEXT, pword TEXT) RETURNS BIGINT AS $$
DECLARE
	newUserId BIGINT;
BEGIN
	IF exists(SELECT 1 FROM users WHERE username = uname)
	THEN
		RETURN 0;
	END IF;
	INSERT INTO users(firstname, lastname, username, password) VALUES
		(fname, lname, uname, pword) RETURNING id INTO newUserId;
	RETURN newUserId;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getTrips(uid BIGINT) RETURNS TABLE(id BIGINT, destination TEXT, startdate TEXT, enddate TEXT, comment TEXT) AS $$
BEGIN
	RETURN QUERY SELECT t.id, t.destination, to_char(to_timestamp(t.startdate/1000), 'YYYY-MM-dd'), to_char(to_timestamp(t.enddate/1000), 'YYYY-MM-dd'), t.comment
	FROM trips t
	WHERE userid = uid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateTrip(tid BIGINT, sdate TEXT, edate TEXT, dest TEXT, com TEXT) RETURNS VOID AS $$
BEGIN
	UPDATE trips
	SET startdate = extract(epoch from to_timestamp(sdate, 'YYYY-MM-dd')) * 1000, enddate = extract(epoch from to_timestamp(edate, 'YYY-MM-dd')) * 1000, destination = dest, comment = com
	WHERE id = tid;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION insertTrip(uid BIGINT, sdate TEXT, edate TEXT, dest TEXT, com TEXT) RETURNS BIGINT AS $$
DECLARE
	newTripId BIGINT;
BEGIN
	INSERT INTO trips (userid, startdate, enddate, destination, comment) 
	VALUES (uid, extract(epoch from to_timestamp(sdate, 'YYYY-MM-dd')) * 1000, extract(epoch from to_timestamp(edate, 'YYY-MM-dd')) * 1000, dest, com)
	RETURNING id INTO  newTripId;
	RETURN newTripId;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION updateUser(uid BIGINT, fname TEXT, lname TEXT, uname TEXT, pword TEXT) RETURNS VOID AS $$
BEGIN
	UPDATE users
	SET firstname = fname, lastname = lname, username = uname, password = COALESCE(pword, password)
	WHERE id = uid;
END;
$$ LANGUAGE plpgsql;