(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: 'social-senti-analyzer',
        };
        vm.messageCount = 0;
        vm.history= [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            var promises = [getHistory()];
            return $q.all(promises).then(function() {
                logger.info('Activated Historical data View');
            });
        }

        function getHistory() {
            return dataservice.getHistory().then(function (data) {
                vm.history= data;
                return vm.history;
            });
        }
    }
})();
