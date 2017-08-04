angular.module('app.login').controller('loginCtrl', loginCtrl);

function loginCtrl(Spinner, $mdDialog, User, $state, $window, States) {
	var vm = this;
	vm.login = login;
	vm.back = back;

	function login() {
		if(!vm.username || vm.username === '' || !vm.password || vm.password === '') {
			return $mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent('Please fill in all fields').ok('ok'));
		}
		Spinner.show();
		User.login({username: vm.username, password: vm.password}).then(function(ret) {
			Spinner.hide();
			if(ret.data === 'Invalid username or password')
				$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Invalid username or password").ok('ok'));
			else {
				User.storeToken(ret.data);
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