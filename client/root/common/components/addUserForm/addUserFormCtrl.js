angular.module('app.components').controller('addUserFormCtrl', addUserFormCtrl);

function addUserFormCtrl($mdDialog, $timeout) {
	var vm = this
	$timeout(() => vm.validate = validate, 0)
	function validate() {
		if(!vm.firstName || vm.firstName === '' || !vm.lastName || vm.lastName === '' || !vm.username || vm.username === '' 
				|| !vm.password || vm.password === '' || !vm.password2 || vm.password2 === '') {
			$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent('Please fill in all fields').ok('ok').multiple(true));
			return false;
		}
		if(vm.password !== vm.password2) {
			$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Passwords don't match").ok('ok').multiple(true));
			return false;
		}
		return true;
	}
}