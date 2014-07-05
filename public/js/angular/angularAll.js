angular.module('test', [])
    .config(viewRouter);

function viewRouter ($routeProvider){
    $routeProvider
        .when('/', {templateURL: 'views/templates/nav.jade'}); 

}