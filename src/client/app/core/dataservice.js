(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getHistory: getHistory
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
                console.log(response.data);
                
                //var data = _.map(response.data, createChartValues);
                var data = [
                    { y: "2006", a: 100, b: 90 },
                    { y: "2007", a: 75,  b: 65 },
                    { y: "2008", a: 50,  b: 40 },
                    { y: "2009", a: 75,  b: 65 },
                    { y: "2010", a: 50,  b: 40 },
                    { y: "2011", a: 75,  b: 65 },
                    { y: "2012", a: 100, b: 90 }
                ];
                return data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
            
            function createChartValues(item){
                return { 
                    y: moment(item.created_on).format('h:mm:ss'),
                    a:  (item.score > 0)? item.score : 0,
                    b: (item.score < 0)? item.score : 0
                };
            }
        }
    }
})();
