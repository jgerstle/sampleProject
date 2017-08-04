angular.module('app.components').component('sideMenuHeaderBar', {
	bindings: {
		title: '<'
	},
	templateUrl: 'root/common/components/sideMenuHeaderBar/sideMenuHeaderBar.html',
	controllerAs: 'vm',
	controller: 'sideMenuHeaderBarCtrl'
});