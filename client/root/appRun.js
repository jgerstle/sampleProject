angular.module('app').run(appRun);

function appRun($transitions, $window, States, $state, User) {
	$transitions.onStart({}, function(trans){
		var toState = trans.$to().name
		var user = JSON.parse($window.localStorage.getItem('user'));
		var toNonAuthorizedState = (toState === States.login || toState === States.logout || toState === States.home || toState === States.signup)
		if(toNonAuthorizedState)
			return;
		// user not authorized
		if(!user) {
			$state.go(States.home);
		}
		if(toState === States.userMaintenance && user.role != User.roles.userMaintainer && user.role != User.roles.admin) {
			$state.go(States.dashboard);
		}
	})
}