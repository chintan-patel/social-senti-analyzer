(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger', '_'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger, _) {
        var service = {
            getHistory: getHistory,
            postHandle: postHandle,
            getRecord: getRecord
        };

        return service;

        function postHandle(handle){
            return $http.post('/api/words/' + handle)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
		}
        function getHistory(){
            return $http.get('/api/words/history')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }

        function getRecord(id){
            return $http.get('/api/record/'+id)
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }

        }
    }
})();
