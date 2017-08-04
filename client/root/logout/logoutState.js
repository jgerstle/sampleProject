angular.module('app.logout').config(logoutState)

function logoutState($stateProvider, $urlRouterProvider) {

    $stateProvider.state('logout', {
        url: '/logout',
        controller: 'logoutCtrl'
    })
}