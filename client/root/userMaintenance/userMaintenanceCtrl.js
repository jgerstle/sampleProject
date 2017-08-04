angular.module('app.userMaintenance').controller('userMaintenanceCtrl', userMaintenanceCtrl)

function userMaintenanceCtrl(User, $scope, Spinner, $filter, $mdDialog, $state, States) {
	var vm = this;
	vm.gridApi = null;
	vm.title = "User Maintenance"
	$scope.deleteRow = deleteRow;
	vm.gridOptions = {
		enableFiltering: true,
		enableGridMenu: true,
		gridMenuShowHideColumns: false,
		paginationPageSizes: [15, 25, 50],
		paginationPageSize: 15,
		gridMenuCustomItems: [
			{
				title: 'Add User',
				action: function (event) {
					$mdDialog.show({
						controller: 'addUserCtrl',
						controllerAs: 'vm',
						templateUrl: 'root/common/components/addUser/addUser.html',
						parent: angular.element(document.body),
						targetEvent: event,
						multiple: true
					}).then(function(trip) {
						if(trip) {
							vm.gridOptions.data.push(trip);
						}
					})
				},
				order: 210
			}
		],
		columnDefs: [
			{name: 'firstname', displayName: 'Last Name', enableHiding: false, enableColumnMenu: false},
			{name: 'lastname', displayName: 'Last Name', enableHiding: false, enableColumnMenu: false},
			{name: 'username', displayName: 'Username', enableHiding: false, enableColumnMenu: false}, 
			{name: 'password', displayName: 'Password', enableHiding: false, enableColumnMenu: false, cellTemplate: '<div>****</div>' },
			{
				name: 'Delete',
				displayName: '',
				cellTemplate: '<md-button class="cellButton" ng-click="grid.appScope.deleteRow(row)" aria-label="delete"><i class="glyphicon glyphicon-trash"></i></md-button>',
				maxWidth: 90,
				enableFiltering: false,
				enableHiding: false,
				enableColumnMenu: false
			}
		]
	}
	
	vm.gridOptions.onRegisterApi = function(gridApi){
		//set gridApi on scope
		vm.gridApi = gridApi;
		vm.gridApi.rowEdit.on.saveRow($scope, editRow);
	};
	Spinner.show();
	User.getUsers().then(function(ret) {
		vm.gridOptions.data = ret.data;
		Spinner.hide();
	}).catch(function(ret) {
		if(ret.status == 403)
			$state.go(States.dashboard);
		else
			$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Internal server error").ok('ok'));
	})

	function deleteRow(row) {
		var user = row.entity;
		Spinner.show();
		User.deleteUser(user).then(function() {
			vm.gridOptions.data.splice(vm.gridOptions.data.indexOf(user), 1);
			Spinner.hide();
		});
	}
	
	function editRow( row ) {
		Spinner.show();
		vm.gridApi.rowEdit.setSavePromise(row, User.updateUser(row).then(() => Spinner.hide()));
	}
}