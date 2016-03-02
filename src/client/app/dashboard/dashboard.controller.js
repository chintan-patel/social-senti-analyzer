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
            title: 'Recent History',
        };
        vm.messageCount = 0;
        vm.history= [];
        vm.title = 'Dashboard';
		vm.searchTwitter = searchTwitter;

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

		function searchTwitter() {
            return dataservice.postHandle(vm.search)
				.then(function (data) {
					vm.history.push(data.analysis);
                    console.log(vm.history);
					return vm.history;
				});
        }
    }
})();
