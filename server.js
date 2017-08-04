var express = require('express');
var bodyParser = require('body-parser');
var user = require('./server/user.js');
var trips = require('./server/trips.js')
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/client'));

app.use(bodyParser.json())

app.post('/signup', user.signup);
app.post('/login', user.login);
app.get('/users', user.authenticate, user.authenticateUserMaintainer, user.getUsers);
app.get('/trips/:userId', user.authenticate, trips.getTrips);
app.post('/editTrip', user.authenticate, trips.editTrip);
app.delete('/trip', user.authenticate, trips.deleteTrip);
app.put('/trip', user.authenticate, trips.addTrip);
app.post('/updateUser', user.authenticate, user.authenticateUserMaintainer, user.editUser);
app.delete('/user', user.authenticate, user.authenticateUserMaintainer, user.deleteUser);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

