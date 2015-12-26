import Ember from 'ember';
const { $, on, Route } = Ember;
export default Route.extend({
  jqSetup: on('activate', function() {
    // adds theme skins to page
    $('body').addClass('theme sidebar-mini');
    // fix for IE page transitions
    $("body").removeClass("hold-transition");
  })
});