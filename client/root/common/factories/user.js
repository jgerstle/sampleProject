angular
	.module('app.factories')
	.factory('User', user)

function user($http, $window) {
	return {
		signup: signup,
		login: login,
		getUsers: getUsers,
		storeToken: storeToken,
		updateUser: updateUser,
		deleteUser: deleteUser,
		logout: logout,
		roles: {
			userMaintainer: 1,
			admin: 2
		}
	}
	function signup(user) {
		return $http.post($window.location.origin + '/signup', user)
	}
	function login(user) {
		return $http.post($window.location.origin + '/login', user);
	}
	function getUsers() {
		return $http.get($window.location.origin + '/users');
	}
	function storeToken(user) {
		$window.localStorage.setItem('user', JSON.stringify(user));
	}
	function updateUser(user) {
		return $http.post($window.location.origin + '/updateUser', user)
	}
	function deleteUser(user) {
		return $http({method: 'delete', url: $window.location.origin + '/user', data: {'id': user.id}});
	}
	function logout() {
		$window.localStorage.removeItem('user');
	}
}