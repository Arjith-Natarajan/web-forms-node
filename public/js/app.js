var app = angular.module('formApp', []);

app.controller('FormController', function($scope) {

});
app.controller('FormDisplayController', function($scope,$http) {
  $scope.registeredCustomer = {};
  $http({
    method: 'POST',
    url: '/get-form-data'
  }).then(function(response) {
    console.log(response);
    $scope.registeredCustomer= response.data;
  }, function(error) {});

});

app.controller("upload", ['$scope', function($scope) {
    $scope.$watch('file', function(newfile, oldfile) {
      if (angular.equals(newfile, oldfile)) {
        return;
      }
      console.log(newfile);
    });
  }])
  .directive("fileinput", [function() {
    return {
      scope: {
        fileinput: "=",
        filepreview: "="
      },
      link: function(scope, element, attributes) {
        element.bind("change", function(changeEvent) {
          scope.fileinput = changeEvent.target.files[0];
          var reader = new FileReader();
          reader.onload = function(loadEvent) {
            scope.$apply(function() {
              scope.filepreview = loadEvent.target.result;
            });
          }
          reader.readAsDataURL(scope.fileinput);
        });
      }
    }
  }]);
