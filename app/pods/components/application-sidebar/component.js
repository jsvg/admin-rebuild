// C application-header
import Ember from 'ember';
const { Component } = Ember;
export default Component.extend({
  tagName: 'aside',
  classNames: ['main-sidebar'],
  didInsertElement() {
    this.$().css('position','fixed');
  }
});