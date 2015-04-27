angular.module('dictionaryApp')
  .controller("DictionaryController", DictionaryController);

DictionaryController.$inject = ['$http'];

function DictionaryController($http) {
  var self = this;

  var targetUrl = 'https://montanaflynn-dictionary.p.mashape.com/define?word=';
  self.targetWord = 'irony';
  var endpoint = targetUrl + self.targetWord;

  self.getJson = $http({
        method: 'GET',
        url: endpoint,
        headers: {
          "X-Mashape-Key": "your key here",
          "Accept": "application/json"
        }
      })
      .success(renderData)
      .error(errorMessage);


  function renderData(jsonWeGotBack) {
    self.data = jsonWeGotBack.definitions;
    console.log('success!');
  }

  function errorMessage() {
    console.log('something went wrong!');
  }

  // All this stuff below goes with the submit form
  self.getDefinition = function(value) {
    self.targetWord = value.toLowerCase();
    endpoint = targetUrl + self.targetWord;
    $http({
            method: 'GET',
            url: endpoint,
            headers: {
              "X-Mashape-Key": "nFygJy6xUVmshyJgI35VydpwGW14p1ASH4sjsnBTr2zUzB3r9d",
              "Accept": "application/json"
            }
          })
          .success(renderData)
          .error(errorMessage);
  };

}