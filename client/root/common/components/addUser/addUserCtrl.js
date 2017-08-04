angular.module('app.components').controller('addUserCtrl', function($mdDialog, Spinner, User) {
	var vm = this;
	vm.save = save;
	vm.close = close;

	function close() {
		$mdDialog.cancel()
	}

	function save() {
		if(!vm.validate())
				return;
		Spinner.show();
		User.signup({firstName: vm.firstName, lastName: vm.lastName, username: vm.username, password: vm.password}).then(function(ret) {
			Spinner.hide();
			if(ret.data === 'user already exists')
				$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Username already exists").ok('ok').multiple(true));
			else {
				$mdDialog.hide({firstname: vm.firstName, lastname: vm.lastName, username: vm.username, id: ret.data.id});
			}
		}).catch(function() {
			Spinner.hide();
			$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Internal server error").ok('ok').multiple(true));
		});
	}
})