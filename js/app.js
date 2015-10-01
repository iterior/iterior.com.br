'use strict';

angular
  .module('app', []);
  .controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$http'];

function AppCtrl ($http) {
  var vm = this;

  $http.get('speakers.json')
    .then(function (response) {
      vm.speakers = response.data;
    });
  $http.get('talks.json')
    .then(function (response) {
      vm.talks = response.data;
    });
}
