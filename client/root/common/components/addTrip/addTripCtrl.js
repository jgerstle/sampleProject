angular.module('app.components').controller('addTripCtrl', addTripCtrl);

function addTripCtrl($mdDialog, Trips, Spinner, $filter, userId) {
	var vm = this;
	vm.close = close;
	vm.save = save;

	function close() {
		$mdDialog.cancel()
	}

	function save() {
		if(!vm.destination || vm.destination === '' || !vm.startDate || vm.startDate === '' || !vm.endDate || vm.endDate === '' || !vm.comment || vm.comment === '') {
			return $mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent('Please fill in all fields').ok('ok').multiple('true'));
		}
		Spinner.show();
		var trip = {userid: userId, startdate: $filter('date')(vm.startDate, 'yyyy-MM-dd'), enddate: $filter('date')(vm.endDate, 'yyyy-MM-dd'), destination: vm.destination, comment: vm.comment};
		Trips.addTrip(trip).then(function(id) {
			trip.id = id;
			Spinner.hide();
			$mdDialog.hide(trip);
		}).catch(function() {
			$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Internal server error").ok('ok').multiple('true'));
		});
	}
}