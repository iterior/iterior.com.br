'use strict';

angular
  .module('app', [
    'ngResource'
    ])
  .controller('AppCtrl', AppCtrl)
  .factory('Subscribe', Subscribe);

AppCtrl.$inject = ['$http', 'Subscribe'];

function AppCtrl ($http, Subscribe) {
  var vm = this;
  vm.site = {};
  vm.speakers = [];
  vm.talks = [];
  vm.partners = [];
  vm.supports = [];
  vm.send = send;
  vm.status = {
    success: false,
    duplicate: false
  };
  vm.speaker = getSpeaker;

  $http.get('/site.json')
    .then(function (response) {
      vm.site = response.data;
    });
  $http.get('/speakers.json')
    .then(function (response) {
      vm.speakers = response.data;
    });
  $http.get('/talks.json')
    .then(function (response) {
      vm.talks = response.data;
    });
  $http.get('/partners.json')
    .then(function (response) {
      vm.partners = response.data;
    });
  $http.get('/supports.json')
    .then(function (response) {
      vm.supports = response.data;
    });

  function getSpeaker (_id) {
    var speaker;
    if (vm.speakers) {
      vm.speakers.filter(function (obj) {
        if (obj._id === _id) speaker = obj;
      });
    }
    return speaker;
  }

  function send () {
    var subscribe = new Subscribe(vm.subscribe);
    subscribe.$save(function (data, putResponseHeaders) {
      console.log(data);
      if (data.code === 11000) {
        vm.status.duplicate = true;
        vm.status.success = false;
      } else {
        vm.status.success = true;
        vm.status.duplicate = false;
      }
    });
  }
}

function Subscribe ($resource) {
  return $resource('/subscribes/:email', null);
}
