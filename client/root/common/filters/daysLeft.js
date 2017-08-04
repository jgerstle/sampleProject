angular.module('app.filters').filter('daysLeft', daysLeft);

function daysLeft($filter) {
	return function(input) {
		inputDate = new Date(input);
		inputDate = Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());
		var today = new Date();
		today = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
		var _MS_PER_DAY = 1000 * 60 * 60 * 24;

		var diff = Math.floor((inputDate - today) / _MS_PER_DAY);
		return diff > 0 ? diff : ''
	}
}