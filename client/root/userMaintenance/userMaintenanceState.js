angular.module('app.userMaintenance').config(userMaintenanceModule)

function userMaintenanceModule($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/userMaintenance');

    $stateProvider.state('userMaintenance', {
        url: '/userMaintenance',
        templateUrl: './root/userMaintenance/userMaintenance.html',
        controllerAs: 'vm',
        controller: 'userMaintenanceCtrl'
    })
}