angular.module('app.logout').controller('logoutCtrl', logoutCtrl);

function logoutCtrl(Spinner, $mdDialog, User, $state) {
	User.logout();
	$state.go('home');
}