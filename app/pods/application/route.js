import Ember from 'ember';
const { $, Route } = Ember;
export default Route.extend({
  jqSetup: function() {
    // adds theme skins to page
    $('body').addClass('theme sidebar-mini sidebar-collapse');
  }.on('activate')
});