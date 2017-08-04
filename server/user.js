var db = require('./db');
var bcrypt = require('bcrypt');
var winston = require('winston');
var Q = require('q');
const uuidv4 = require('uuid/v4');
var saltRounds = 10;
const userRoles = {
	userMaintainer: 1,
	admin: 2
}

function login(req, res, next) {
	db.query('SELECT id, password, userrole as role FROM users where username = $1', [req.body.username], true).then(function(data) {
		if(!data.id)
			return res.status(200).send('Invalid username or password');
		bcrypt.compare(req.body.password, data.password).then(function(correctPassword){
			if(!correctPassword)
				return res.status(200).send('Invalid username or password');
			delete data.password;
			createAndSendUserAndToken(res, data)
		})
		var x = data;
	}).catch(function(error){
		winston.log('error logging in: ' + error);
		res.status(500).send('error logging in')
	})
}

function signup(req, res, next) {
	bcrypt.hash(req.body.password, saltRounds).then(function(hash){
		db.query('SELECT * FROM signup($1, $2, $3, $4)', [req.body.firstName, req.body.lastName, req.body.username, hash], true).then(function(data) {
			if(data.signup != 0) {
				createAndSendUserAndToken(res, {id: data.signup, role: 0})
			}
			else
				res.send('user already exists');
		}).catch(function(error) {
			winston.error('error signing up: ' + error);
			res.status(500).send();
		})
	});
}

function createAndSendUserAndToken(res, user) {
	var token = uuidv4();
	db.query('INSERT INTO tokens (token, userid) VALUES ($1, $2);', [token, user.id]).then(function(){
		user.token = token;
		res.send(user);
	}).catch(function(error) {
		winston.error('error creating user token: ' + error);
		res.status(500).send();
	});
}

function getUsers(req, res, next) {
	db.query('SELECT id, firstname, lastname, username FROM users;').then(function(users) {
		res.send(users);
	}).catch(function(error) {
        console.log('error retrieving users: ' + error);
		res.status(500).send('error retrieving users');
    });
}

function authenticate(req, res, next) {
	db.query('SELECT u.id, u.userrole AS role FROM tokens t JOIN users u ON u.id = t.userid WHERE token = $1;', [req.headers.token], true).then(function(data) {
		if(data && data.id) {
			data.id = parseInt(data.id);
			data.role = parseInt(data.role);
			req.body.user = data;
			next();
		}
		else {
			res.status(403).send();
		}
	}).catch(function(error) {
        console.log('error auhenticating user ' + error);
		res.status(500).send('error auhenticating user');
    });
}

function authenticateUserMaintainer(req, res, next) {
	if(req.body.user.role === userRoles.userMaintainer || isAdmin(req.body.user)) {
		return next();
	}
	return res.status(403).send();
}

function editUser(req, res, next) {
	Q(req.body.password ? bcrypt.hash(req.body.password, saltRounds) : null).then(function(hash) {
		db.query('SELECT * FROM updateUser($1, $2, $3, $4, $5)', [req.body.id, req.body.firstname, req.body.lastname, req.body.username, hash]).then(function() {
			res.send('success');
		}).catch(function(error) {
			console.log('error updating user ' + error);
			res.status(500).send('error updating user');
		});
	});
}

function deleteUser(req, res, next) {
	db.query('DELETE FROM users WHERE id = $1', [req.body.id]).then(function() {
		res.send('success');
	}).catch(function(error) {
		console.log('error deleting user ' + error);
		res.status(500).send('error deleting user');
	});
}

function isAdmin(user) {
	return user.role === userRoles.admin;
}

exports.login = login;
exports.getUsers = getUsers;
exports.signup = signup;
exports.authenticate = authenticate;
exports.authenticateUserMaintainer = authenticateUserMaintainer;
exports.editUser = editUser;
exports.deleteUser = deleteUser;
exports.isAdmin = isAdmin;