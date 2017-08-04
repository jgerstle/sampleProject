angular.module('app.components').component('addUserForm', {
	bindings: {
		firstName: '=',
		lastName: '=',
		username: '=',
		password: '=',
		validate: '='
	},
	templateUrl: 'root/common/components/addUserForm/addUserForm.html',
	controllerAs: 'vm',
	controller: 'addUserFormCtrl'
});