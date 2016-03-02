(function() {
    'use strict';

    angular
        .module('app.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'history',
                config: {
					url: '/record/:record_id',
                    templateUrl: 'app/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'History',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> History'
                    }
                }
            }
        ];
    }
})();
