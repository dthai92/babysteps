(function () {
  'use strict';

  angular
    .module('baby', [
      /* Shared Modules */
      'ui.router',
      'ngStorage',
      'ui.bootstrap',
      'angular-filepicker',
      /* Feature areas */
      'baby.landing',
      'baby.signup',
      'baby.login',
      'baby.dashboard',
      'baby.milestone',
      'baby.events',
      'baby.about',
      'baby.faq',
      'baby.vaccinations'
    ]);
})();

