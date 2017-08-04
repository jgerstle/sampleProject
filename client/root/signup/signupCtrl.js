angular.module('app.signup').controller('signupCtrl', signupCtrl);

function signupCtrl(User, $mdDialog, Spinner, $state, $window, States) {
	var vm = this;
	vm.signup = signup;
	vm.back = back;

	function signup() {
		if(!vm.validate())
			return;
		Spinner.show();
		User.signup({firstName: vm.firstName, lastName: vm.lastName, username: vm.username, password: vm.password}).then(function(ret) {
			Spinner.hide();
			if(ret.data === 'user already exists')
				$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Username already exists").ok('ok'));
			else {
				User.storeToken(ret.data);
				$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Success').textContent("You have succesfully signed up").ok('ok'));
				$state.go(States.dashboard);
			}
		}).catch(function() {
			Spinner.hide();
			$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Internal server error").ok('ok'));
		});
	}
	function back() {
		$window.history.back()
	}
}