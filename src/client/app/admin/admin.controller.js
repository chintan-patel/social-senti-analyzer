(function () {
    'use strict';

    angular
        .module('app.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', 'dataservice', '$stateParams'];
    /* @ngInject */
    function AdminController(logger, dataservice, $stateParams) {
        var vm = this;
        vm.title = 'Admin';
        
        function activate(data){
            vm.hashtag = '#' + data.searchHash;
            vm.data = createChartValues(data);
            vm.xkey = 'y';
            vm.ykeys = ["a"];
            vm.labels = ["Comments"];
            vm.colors = ["#31C0BE"];
        }
        
        function createChartValues(data){
            var values = [];
                console.log(data);
            for(var i = 0; i < data.analysis.length; i++) { 
                var tmp = {
                    y: i+1,
                    a:(data.analysis[i].score > 0)? data.analysis[i].score : 0
                };
                values.push(tmp);
            };
            console.log(values);
            return values;
        }
        
        dataservice.getRecord($stateParams.record_id).
        then(function (data){
            console.log(data);
            activate(data);
        })
        .catch(function(err){
            console.log(err);
        });
    }
})();
