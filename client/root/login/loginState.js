angular.module('app.login').config(loginState)

function loginState($stateProvider, $urlRouterProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './root/login/login.html',
        controllerAs: 'vm',
        controller: 'loginCtrl'
    })
}