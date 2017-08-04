angular.module('app.signup').config(signupState)

function signupState($stateProvider, $urlRouterProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: './root/signup/signup.html',
        controllerAs: 'vm',
        controller: 'signupCtrl'
    })
}