'use strict'

var name = $('#name').val();
var doc = {};

angular.module('App', ['ngRoute'])

.config(function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: 'assets/views/home.html',
      controller: 'homeCtrl'
    })
    .when('/persons', {
      templateUrl: 'assets/views/persons.html',
      controller: 'personsCtrl'
    })
    .when('/quotes/:person_id', {
      templateUrl: 'assets/views/quotes.html',
      controller: 'quotesCtrl'
    })
    .otherwise({
      redirectTo: '/home'
    });
})

.config(function($compileProvider) {
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|sms):/);
})

.controller('homeCtrl', ['$scope', function homeCtrl($scope) {

}])

.controller('personsCtrl', ['$scope', 'personSrv', function personsCtrl($scope, personSrv) {
  $scope.persons = personSrv.getAllPersons();
}])

.controller('quotesCtrl', ['$scope', '$routeParams', 'personSrv', 'quotesSrv', function quotesCtrl($scope, $routeParams, personSrv, quotesSrv) {
  $scope.person = personSrv.getPerson(parseInt($routeParams.person_id));
  $scope.quotes = quotesSrv.getAllQuotesFromPerson(parseInt($routeParams.person_id));
}])

.factory('personSrv', [function() {
  var persons = [{
    'id': 0,
    'name': 'Bill Gates'
  }, {
    'id': 1,
    'name': 'Steve Jobs'
  }];
  return {
    getAllPersons: function() {
      return persons;
    },
    getPerson: function(person_id) {
      for (var i = 0; i < persons.length; i++) {
        if (persons[i].id === person_id) {
          return persons[i];
        };
      }
      return null;
    }
  }
}])

.factory('quotesSrv', [function() {
  var quotes = [{
    'id': 0,
    'quotes': ['Bill Gates quote 1', 'Bill Gates quote 2']
  }, {
    'id': 1,
    'quotes': ['Steve Jobs quote 1', 'Steve Jobs quote 2']
  }];
  return {
    getAllQuotes: function() {
      return quotes;
    },
    getAllQuotesFromPerson: function(person_id) {
      for (var i = 0; i < quotes.length; i++) {
        if (quotes[i].id === person_id) {
          return quotes[i].quotes;
        };
      }
      return null;
    }
  }
}]);
