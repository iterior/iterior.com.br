'use strict';

angular
  .module('app', [])
  .controller('AppCtrl', AppCtrl)
  .factory('SubscribeFactory', SubscribeFactory);

AppCtrl.$inject = ['$http', 'SubscribeFactory'];

function AppCtrl ($http, SubscribeFactory) {
  var vm = this;
  vm.speaker = getSpeaker;
  vm.subscribe = subscribe;
  vm.success = false;

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
  $http.get('/support.json')
    .then(function (response) {
      vm.support = response.data;
    });

  function getSpeaker (_id) {
    var speaker;
    vm.speakers.filter(function (obj) {
      if (obj._id === _id) speaker = obj;
    });
    return speaker;
  }

  function subscribe () {
    SubscribeFactory.save(vm.person);
  }
}

function SubscribeFactory ($http) {
  var SubscribeFactory = {
    save: function (data) {
      $http.post('/subscribe', data)
        .then(function (response) {
          if (!response) console.error(response.error);
          var data = response.data;
        });
    }
  };
  return SubscribeFactory;
}
