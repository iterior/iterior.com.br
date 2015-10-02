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

  function getSpeaker (_id) {
    var speaker;
    vm.speakers.filter(function (obj) {
      if (obj._id === _id) speaker = obj;
    });
    return speaker;
  }

  function subscribe () {
    $http.post('/subscribe', vm.person)
      .then(function (response) {

      });
  }
}

function SubscribeFactory ($http) {
  var SubscribeFactory = {
    save: function (data) {
      $http.post('/subscribe', vm.subscribe)
      .then(function (response) {
        if (!response) console.error(response.error);
        var data = response.data;
      });
    }
  };
  return SubscribeFactory;
}
