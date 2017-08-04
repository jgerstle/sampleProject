angular.module('app.dashboard').controller('dashboardCtrl', dashboardCtrl)

function dashboardCtrl(Trips, $scope, Spinner, $filter, $mdDialog, Utilities, $window, User) {
	var vm = this;
	vm.gridApi = null;
	vm.loadTrips = loadTrips;
	vm.title = "Dashboard";
	$scope.deleteRow = deleteRow;

	vm.gridOptions = {
		enableFiltering: true,
		enableGridMenu: true,
		gridMenuShowHideColumns: false,
		paginationPageSizes: [15, 25, 50],
		paginationPageSize: 15,
		gridMenuCustomItems: [
			{
				title: 'Add Trip',
				action: function (event) {
					$mdDialog.show({
						locals: { userId: vm.user },
						controller: 'addTripCtrl',
						controllerAs: 'vm',
						templateUrl: 'root/common/components/addTrip/addTrip.html',
						parent: angular.element(document.body),
						targetEvent: event,
						clickOutsideToClose:true,
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
			{ name: 'destination', enableHiding: false, enableColumnMenu: false },
			{
				name: 'startdate', 
				displayName: 'Start Date',
				cellFilter: "date", 
				enableHiding: false,
				enableColumnMenu: false
				//  editableCellTemplate: '<md-datepicker custom-cell-edit ng-model="MODEL_COL_FIELD" md-placeholder="Enter date" md-is-open="true"></md-datepicker>'
			},
			{ name: 'enddate', displayName: 'End Date', cellFilter: "date", enableHiding: false, enableColumnMenu: false },
			{ field: 'startdate', displayName: 'Days Until Trip', name: 'daysLeft', cellFilter: 'daysLeft', enableHiding: false, enableColumnMenu: false},
			{ name: 'comment', enableHiding: false, enableColumnMenu: false }, 
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
		vm.gridApi.rowEdit.on.saveRow($scope, saveRow);
	};
	
	var user = JSON.parse($window.localStorage.getItem('user'));
	if(!user)
		return;
	vm.user = user.id;
	loadTrips(true);

	function loadTrips(firstLoad) {
		Spinner.show();
		Trips.getTrips(vm.user).then(function(ret) {
			vm.gridOptions.data = ret.data;
			if(!firstLoad || user === null || user.role != User.roles.admin) {
				return Spinner.hide();
			}
			User.getUsers().then(function(ret){
				vm.users = ret.data;
				Spinner.hide();
			}).catch(Utilities.internalServerError);
		}).catch(Utilities.internalServerError);
	}

	function deleteRow(row) {
		var trip = row.entity;
		Spinner.show();
		Trips.deleteTrip(trip).then(function() {
			vm.gridOptions.data.splice(vm.gridOptions.data.indexOf(trip), 1);
			Spinner.hide();
		}).catch(Utilities.internalServerError);
	}
	
	function saveRow( row ) {
		Spinner.show();
		// row.startdate = $filter('date')(row.startdate, 'yyyy-MM-dd');
		vm.gridApi.rowEdit.setSavePromise(row, Trips.updateTrip(row).then(() => Spinner.hide()));
	}
}