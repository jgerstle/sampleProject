angular.module('app').config(config);

function config($httpProvider) {
	//allow sending of JSON to delete request
	$httpProvider.defaults.headers.delete = { "Content-Type": "application/json;charset=utf-8" };
	$httpProvider.interceptors.push('AuthInterceptor');
}