(function () {
  'use strict'

  angular
  .module('app')
  .filter('renderHTMLCorrectly', function($sce)
    {
      return function(stringToParse)
      {
        return $sce.trustAsHtml(stringToParse);
      }
});
})();

/*
 <p ng-bind-html="item.mensaje | renderHTMLCorrectly"></p>*/