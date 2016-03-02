(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger', '_'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger, _) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getHistory: getHistory,
            getRecord: getRecord
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            return $http.get('/api/people')
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
