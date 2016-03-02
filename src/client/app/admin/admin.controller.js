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
        
        function activate(data){
            vm.data = data;
            vm.hashtag="#Oscars #madmax";
            vm.xkey = 'y';
            vm.ykeys = ["a", "b"];
            vm.labels = ["Positive Comments", "Negative Comments"];
            vm.colors = ["#31C0BE", "#c7254e"];
        }
        dataservice.getHistory().
        then(function (data){
            activate(data);
        })
        .catch(function(err){
            console.log(err);
        });
    }
})();
