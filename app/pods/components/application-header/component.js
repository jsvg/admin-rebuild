// C application-header
import Ember from 'ember';
const { Component } = Ember;
export default Component.extend({
  tagName: 'header',
  classNames: ['main-header'],
  didInsertElement() {
    this.$().css('position','fixed').css('width', '100%');
  }
});