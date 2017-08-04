angular.module('app.dashboard').config(dashboardModule)

function dashboardModule($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider.state('dashboard', {
        url: '/dashboard',
        templateUrl: './root/dashboard/dashboard.html',
        controllerAs: 'vm',
        controller: 'dashboardCtrl'
    })
}