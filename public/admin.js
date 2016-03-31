/**
 * Created by elad.katz on 31/03/2016.
 */
var myApp = angular.module('myApp', ['ng-admin']);
myApp.config(['NgAdminConfigurationProvider', function (nga) {

    var admin = nga.application('My First Admin')
        .baseApiUrl('http://localhost:6007/api/v1/');

    var product = nga.entity('products').identifier(nga.field('_id'));

    product.listView().fields([
        nga.field('name').isDetailLink(true),
        nga.field('productId'),
        nga.field('logoPath'),
        nga.field('bottomLine')
    ]);

    product.creationView().fields([
        nga.field('name'),
        nga.field('productId'),
        nga.field('logoPath'),
        nga.field('bottomLine')
    ]);

    product.editionView().fields(product.creationView().fields());

    product.showView().fields([
        nga.field('name'),
        nga.field('productId'),
        nga.field('logoPath'),
        nga.field('bottomLine')
    ]);

    admin.addEntity(product);


    //
    //var admin = nga.application('My First Admin')
    //    .baseApiUrl('http://jsonplaceholder.typicode.com/');
    //var user = nga.entity('users');
    //user.listView().fields([
    //    nga.field('name'),
    //    nga.field('username'),
    //    nga.field('email')
    //]);
    //admin.addEntity(user)


    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);