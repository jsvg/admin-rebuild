import Ember from 'ember';
const { $, on, Route } = Ember;
export default Route.extend({
  jqSetup: on('activate', function() {
    // prep sidebar
    $('body').addClass('sidebar-collapse sidebar-mini');
    // fix for IE page transitions
    $("body").removeClass("hold-transition");
  })
});