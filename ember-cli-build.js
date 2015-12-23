/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
  });

  // bower: FA, bootstrap, jqueryUI
  app.import('bower_components/jquery-ui/jquery-ui.js');
  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.eot', {destDir: "fonts"});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.svg', {destDir: "fonts"});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {destDir: "fonts"});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff', {destDir: "fonts"});
  app.import('bower_components/font-awesome/fonts/fontawesome-webfont.woff2', {destDir: "fonts"});
  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  app.import('bower_components/bootstrap/dist/css/bootstrap.css.map');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.eot', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.svg', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.ttf', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff', {destDir: "fonts"});
  app.import('bower_components/bootstrap/fonts/glyphicons-halflings-regular.woff2', {destDir: "fonts"});
  app.import('vendor/custom-theme.css');

  return app.toTree();
};
