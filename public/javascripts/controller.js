var app = angular.module('app', []);
app.factory('getImageCards', function ($http) {

  var API_ROOT = 'images'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    }
  }

});

app.controller('mainCtrl', function($scope, $http, getImageCards) {

  $scope.formData = {};
  $scope.editData = {};
  $scope.images = [];

  $scope.editData.blur = '0';
  $scope.editData.brightness = '100';
  $scope.editData.contrast = '100';
  $scope.editData.grayscale = '0';

  getImageCards.get()
    .then(function (data) {
      $scope.images = data;
    })

  $scope.addImage = function() {
    var theData = {
        url: $scope.formData.url,
        name: $scope.formData.name,
        description: $scope.formData.description,
        lastEdit: getFormattedTime(),
        index: $scope.images.length,
        blur: '0',
        brightness: '100',
        contrast: '100',
        grayscale: '0'
    };

    $http({
       url: 'images',
       method: "POST",
       data: theData
    }).success(function(data, status, headers, config) {
      console.log("Post Image Success");
    }).error(function(data, status, headers, config) {
      console.log("Post Image Failed");
    });
    $scope.images.push(theData);
  }

  $scope.updateImage = function(index) {
    
    var theData = {
        url: $scope.editData.url,
        name: $scope.editData.name,
        description: $scope.editData.description,
        lastEdit: getFormattedTime(),
        index: index,
        blur: $scope.editData.blur,
        brightness: $scope.editData.brightness,
        contrast: $scope.editData.contrast,
        grayscale: $scope.editData.grayscale
    };

    $http({
       url: 'images',
       method: "PUT",
       data: theData
    }).success(function(data, status, headers, config) {
      console.log("Update Image Success");
    }).error(function(data, status, headers, config) {
      console.log("Update Image Failed");
    });
    $scope.images[index] = theData;
  }

  $scope.editPhoto = function(image) {
    $scope.editData.blur = image.blur;
    $scope.editData.brightness = image.brightness;
    $scope.editData.contrast = image.contrast;
    $scope.editData.grayscale = image.grayscale;
    $scope.editData.url = image.url;
    $scope.editData.name = image.name;
    $scope.editData.description = image.description;
    $scope.editData.index = image.index;
    
    $scope.editMode = true;

  }

});

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getFormattedTime() {
    var d = new Date();
    var date = (d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
    var meridian = 'AM';
    var h = addZero(d.getHours());
    if (parseInt(h) > 12) { h = parseInt(h) - 12; meridian = 'PM'; }
    var m = addZero(d.getMinutes());
    return date + ' at ' + h + ":" + m + ' ' + meridian;
}

