angular.module('app.components').factory('States', states);

function states() {
	return {
		dashboard: 'dashboard',
		userMaintenance: 'userMaintenance',
		login: 'login',
		home: 'home',
		signup: 'signup',
		logout: 'logout'
	}
}