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

  function subscribe () {
    SubscribeFactory.save(vm.person);
    var url = 'http://getsimpleform.com/message/ajax?form_api_token=f8742ce7d1a511b804312f46cb11db8d'
    var config = {
      dataType: 'jsonp'
    };
    $http.post(url, vm.person, config)
      .then(function(response) {
        vm.success = true;
      });
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
