var db = require('./db');
var winston = require('winston');
var user = require('./user');
var Q = require('q');

function getTrips(req, res, next) {
	userId = user.isAdmin(req.body.user) ? req.params.userId : req.body.user.id;
	db.query('SELECT id, destination, startdate, enddate, comment FROM getTrips($1);', [userId]).then(function(trips) {
		res.send(trips);
	}).catch(function(error) {
        winston.error('error retrieving trips: ' + error);
		res.status(500).send('error retrieving trips');
    });
}

function canEditTrip(tripId, userArg) {
	return Q(user.isAdmin(userArg) ? true : db.query('SELECT id FROM trips WHERE id = $1 AND userid = $2', [tripId, userArg.id], true).then(function(data) {
		return data.id;
	}))
}

function editTrip(req, res, next) {
	canEditTrip(req.body.id, req.body.user).then(function(canEdit) {
		if(canEdit) {
			db.query('SELECT * FROM updateTrip($1, $2, $3, $4, $5)', [req.body.id, req.body.startdate, req.body.enddate, req.body.destination, req.body.comment]).then(function() {
				res.send('success');
			}).catch(function(error){
				winston.error('error updating trip: ' + error)
				res.status(500).send('error updating trip');
			})
		}
		else {
			res.status(403).send('This user canot edit this data');
		}
	}).catch(function(error){
		winston.error('error updating trip: ' + error)
		res.status(500).send('error updating trip');
	});
}

function deleteTrip(req, res, next) {
	canEditTrip(req.body.id, req.body.user).then(function(canEdit) {
		if(canEdit) {
			db.query('DELETE FROM trips WHERE id = $1', [req.body.id]).then(function() {
				res.send('success');
			}).catch(function(error){
				winston.error('error deleting trip: ' + error)
				res.status(500).send('error deleting trip');
			})
		}
		else {
			res.status(403).send('This user canot delete this data');
		}
	}).catch(function(error){
		winston.error('error deleting trip: ' + error)
		res.status(500).send('error deleting trip');
	});
}

function addTrip(req, res, next) {
	var userId = user.isAdmin(req.body.user) ? req.body.userid : req.body.user.id;
	db.query('SELECT * FROM inserttrip($1, $2, $3, $4, $5);', [userId, req.body.startdate, req.body.enddate, req.body.destination, req.body.comment]).then(function(tripId) {
		res.send(tripId);
	}).catch(function(error){
		winston.error('error adding trip: ' + error)
		res.status(500).send('error adding trip');
	})
}

exports.getTrips = getTrips;
exports.editTrip = editTrip;
exports.deleteTrip = deleteTrip;
exports.addTrip = addTrip;