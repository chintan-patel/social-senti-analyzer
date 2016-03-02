(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', 'dataservice'];
    /* @ngInject */
    function AdminController(logger, dataservice) {
        var vm = this;
        vm.title = 'Admin';
        vm.hashtag="#Oscars #madmax";
        vm.data = [
            { y: "2006", a: 100, b: 90 },
            { y: "2007", a: 75,  b: 65 },
            { y: "2008", a: 50,  b: 40 },
            { y: "2009", a: 75,  b: 65 },
            { y: "2010", a: 50,  b: 40 },
            { y: "2011", a: 75,  b: 65 },
            { y: "2012", a: 100, b: 90 }
        ];
        vm.xkey = 'y';
        vm.ykeys = ["a", "b"];
        vm.labels = ["Positive Comments", "Negative Comments"];
        vm.colors = ["#31C0BE", "#c7254e"];
        dataservice.getSentiment().
        then(function (data){
            vm.history = data;
        })
        .catch(function(err){
            console.log(err);
        });
    }
})();
