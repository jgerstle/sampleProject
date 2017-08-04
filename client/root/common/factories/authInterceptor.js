angular.module('app.factories').factory('AuthInterceptor', authInterceptor);

function authInterceptor($window) {
	return{
		request: request,

	}
	function request(config) {
		if($window.localStorage.getItem('user') !== null) {
			config.headers.token = JSON.parse($window.localStorage.getItem('user')).token;
		}
		return config;
	}
}