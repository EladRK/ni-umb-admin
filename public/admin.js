var myApp = angular.module('myApp', ['ng-admin']);


myApp.config(['NgAdminConfigurationProvider', function (nga) {

    var businessEntitiesApi = 'http://business-entities-bos.corp.naturalint.com/api/v1/';
    var vertigonApi = 'http://vertigon.corp.naturalint.com/api/v1/';
    //var articleApi = 'http://article-bos.corp.naturalint.com/api/v1/';
    var articleApi = 'http://localhost:6006/api/v1/';
    var viewApi = 'http://view-bos.corp.naturalint.com/api/v1/';


    var admin = nga.application('Umbrela Admin').baseApiUrl(businessEntitiesApi);

    var link = nga.entity('links').baseApiUrl(businessEntitiesApi).identifier(nga.field('id'));
    link.listView().fields([
        nga.field('name').isDetailLink(true),
        nga.field('productId', 'number'),
        nga.field('isActive', 'boolean'),
        nga.field('isDefault', 'boolean'),
        nga.field('url'),
        nga.field('priceValue', 'number').format('$0,0.00'),
        nga.field('priceCurrency', 'choice')
            .choices([
                {label: 'USD', value: 'USD'},
                {label: 'EURO', value: 'EURO'}
            ]),
        nga.field('oldPrice', 'number').format('$0,0.00'),
        nga.field('priceText')
    ]);
    link.showView().fields(link.listView().fields());
    link.creationView().fields(link.listView().fields());
    link.editionView().fields(link.listView().fields());
    admin.addEntity(link);

    var partner = nga.entity('partners').baseApiUrl(businessEntitiesApi).identifier(nga.field('id'));

    partner.listView().fields([
        nga.field('name').isDetailLink(true),
        nga.field('advertiserId', 'number'),
        nga.field('email'),
        nga.field('phone'),
        nga.field('address'),
        nga.field('website'),
        nga.field('logo')
    ]);
    partner.showView().fields([
        nga.field('name'),
        nga.field('advertiserId', 'number'),
        nga.field('email'),
        nga.field('phone'),
        nga.field('address'),
        nga.field('website'),
        nga.field('logo')
    ]);
    partner.creationView().fields([
        nga.field('name')
            .attributes({placeholder: 'name can only contain letters, numbers and dashes'})
            .validation({required: true, pattern: '[a-z0-9\-]+'}),
        nga.field('advertiserId', 'number')
            .validation({required: true, pattern: '[a-z0-9\-]+'}),
        nga.field('email', 'email'),
        nga.field('phone'),
        nga.field('address'),
        nga.field('website'),
        nga.field('logo')

    ]);
    partner.editionView().fields(partner.creationView().fields());
    admin.addEntity(partner);


    var product = nga.entity('products').baseApiUrl(businessEntitiesApi).identifier(nga.field('id'));

    product.listView().fields([
        nga.field('name').isDetailLink(true),
        nga.field('productId', 'number'),
        nga.field('logoPath'),
        nga.field('bottomLine')
    ]);
    product.creationView().fields([
        nga.field('name')
            .attributes({placeholder: 'name can only contain letters, numbers and dashes'})
            .validation({required: true, pattern: '[a-z0-9\-]+'}),
        nga.field('productId', 'number')
            .validation({required: true, pattern: '[a-z0-9\-]+'}),
        nga.field('logoPath'),
        nga.field('bottomLine')
    ]);
    product.editionView().fields(product.creationView().fields());
    product.showView().fields([
        nga.field('name'),
        nga.field('productId', 'number'),
        nga.field('logoPath'),
        nga.field('bottomLine')
    ]);
    admin.addEntity(product);

    var site = nga.entity('sites').baseApiUrl(businessEntitiesApi).identifier(nga.field('id'));

    site.listView().fields([
        nga.field('title').isDetailLink(true),
        nga.field('siteId', 'number')
    ]);
    site.creationView().fields([
        nga.field('title')
            .attributes({placeholder: 'name can only contain letters, numbers and dashes'})
            .validation({required: true, pattern: '[a-z0-9\-]+'}),
        nga.field('siteId', 'number')
            .validation({required: true, pattern: '[a-z0-9\-]+'})
    ]);
    site.editionView().fields(site.creationView().fields());
    site.showView().fields([
        nga.field('name'),
        nga.field('siteId', 'number')
    ]);

    admin.addEntity(site);


    var article = nga.entity('articles')
        .baseApiUrl(articleApi)
        .identifier(nga.field('id'));

    article.listView().fields([
        nga.field('title').isDetailLink(true),
        //nga.field('segmentId'),
        nga.field('seo.title'),
        nga.field('name'),
        //nga.field('tagId'),
        nga.field('thumb.title'),
        nga.field('createDate'),
        nga.field('updateDate')
    ]);
    article.showView().fields(article.listView().fields());
    article.creationView().fields([
        nga.field('title'),
        nga.field('segmentId'),
        nga.field('authorId'),
        nga.field('verticalId'),
        nga.field('brief'),
        nga.field('body', 'wysiwyg'),
        nga.field('seo.index', 'boolean'),
        nga.field('seo.follow', 'boolean'),
        nga.field('seo.title'),
        nga.field('seo.canonical'),
        nga.field('seo.description'),
        nga.field('name'),
        nga.field('tagId'),
        nga.field('thumb.url'),
        nga.field('thumb.title'),
        nga.field('thumb.alt')
        //nga.field('createDate', 'date')
    ]);
    article.editionView().fields(article.creationView().fields());
    admin.addEntity(article);



    // attach the admin application to the DOM and execute it
    nga.configure(admin);
}]);


myApp.config(function (RestangularProvider) {
    RestangularProvider.addResponseInterceptor(function (data, operation, what, url, response) {
        //if (operation == "getList") {
        //response.totalCount = data.meta.pagination.total;
        data = data.content;
        //}
        console.log(response);
        return data;
    });
    RestangularProvider.addFullRequestInterceptor(function(element, operation, what, url, headers, params, httpConfig) {

        var data = element;
        var element = {content: data};

        //if (operation == 'getList' && what == 'entityName') {
        //    params.page = params._page;
        //    params.limit = params._perPage;
        //    delete params._page;
        //    delete params._perPage;
        //}
        return { params: params, element: element };
    });
});