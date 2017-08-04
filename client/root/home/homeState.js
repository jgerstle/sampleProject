angular.module('app.home').config(homeState)

function homeState($stateProvider, $urlRouterProvider) {

    if(window.localStorage.getItem('user') !== null)
        $urlRouterProvider.otherwise('/dashboard');
    else
        $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: './root/home/home.html'
    })
}