var appModule = angular.module('myApp', []); 

appModule.controller('MainCtrl', ['$scope', function($scope) {
    $scope.greeting = 'Controller <> Directive communication example!';
    $scope.clicks = 0;

    $scope.onClick = function(clicks) {
        $scope.clicks = clicks;
        $scope.options.registerClicks(clicks);
    }
}]);

appModule.directive('directive', function() {
    return {
        restrict: 'E',
        templateUrl: 'directive.html',

        scope: {
            options: '=',
            onClick: '&'
        },
        controller: function($scope) {
            $scope.clicks = 0;
            $scope.registeredClicks = 0;
            $scope.click = function() {
                $scope.clicks++;
                $scope.onClick({clicks: $scope.clicks});
            }

            $scope.options = {
                    registerClicks: function(clicks) {
                        $scope.registeredClicks = clicks;
                    }
            }
        }
    };
});