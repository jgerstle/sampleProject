angular.module('app.components').controller('sideMenuHeaderBarCtrl', sideMenuHeaderBarCtrl);

function sideMenuHeaderBarCtrl($mdSidenav, User, $window) {
	var vm = this;
	vm.toggleMenu = toggleMenu;
	var user = JSON.parse($window.localStorage.getItem('user'));
	vm.isUserMaintainer = user && (user.role == User.roles.admin || user.role == User.roles.userMaintainer);

	function toggleMenu() {
		$mdSidenav('left').toggle();
	}
}