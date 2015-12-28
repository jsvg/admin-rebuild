/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    emberCliFontAwesome: {
      useScss: true
    }
  });
  
  app.import('bower_components/Ionicons/css/ionicons.css');
  app.import('bower_components/Ionicons/fonts/ionicons.eot', {destDir: "fonts"});
  app.import('bower_components/Ionicons/fonts/ionicons.woff', {destDir: "fonts"});
  app.import('bower_components/Ionicons/fonts/ionicons.svg', {destDir: "fonts"});
  app.import('bower_components/Ionicons/fonts/ionicons.ttf', {destDir: "fonts"});

  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2', {destDir: "fonts"});

  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/interact/interact.js');
  app.import('bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.js');

  return app.toTree();
};
