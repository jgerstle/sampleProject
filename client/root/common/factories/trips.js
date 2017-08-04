angular.module('app.factories').factory('Trips', trips)

function trips($http, $window) {
	return {
		getTrips: getTrips,
		updateTrip: updateTrip,
		deleteTrip: deleteTrip,
		addTrip: addTrip
	}
	
	function getTrips(userId) {
		return $http.get($window.location.origin + '/trips/' + userId);
	}

	function updateTrip(trip) {
		return $http.post($window.location.origin + '/editTrip', trip);
	}
	function deleteTrip(trip) {
		return $http({method: 'delete', url: $window.location.origin + '/trip', data: {'id': trip.id}});
	}
	function addTrip(trip) {
		return $http.put($window.location.origin + '/trip', trip)
	}
}