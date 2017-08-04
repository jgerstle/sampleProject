angular.module('app.factories').factory('Utilities', utilities)

function utilities(Spinner, $mdDialog) {
	return {
		internalServerError: internalServerError
	}
	function internalServerError() {
		Spinner.hide();
		$mdDialog.show($mdDialog.alert().clickOutsideToClose(false).title('Oops').textContent("Internal server error").ok('ok').multiple('true'));
	}
}