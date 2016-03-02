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
            /*vm.data = createChartValues(data.analysis);
            
            vm.xkey = 'y';
            vm.ykeys = ["a", "b"];
            vm.labels = ["Positive Comments", "Negative Comments"];
            vm.colors = ["#31C0BE", "#c7254e"];*/
        }
        
        function createChartValues(item){
            var values = [];
                console.log(item);
            for(var i = 0; i < item.analysis.length; i++) { 
                var tmp = {
                    y: moment(item[i].created_on).format('hh:mm:ss'),
                    a:  (item[i].score > 0)? item[i].score : 0
                };
                values.push(tmp);
            };
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
