/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    emberCliFontAwesome: {
      useScss: true
    }
  });

  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2', {destDir: "fonts"});

  // jquery plugins need to be imported
  app.import('bower_components/jquery-slimscroll/jquery.slimscroll.js');
  app.import('bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');

  app.import('vendor/custom-theme.css');

  return app.toTree();
};
