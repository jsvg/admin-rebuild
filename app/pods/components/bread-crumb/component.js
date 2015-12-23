// C bread-crumb
import Ember from 'ember';
import layout from '../bread-crumb/template';

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  layout,
  tagName: 'li',
  classNameBindings: ['crumbClass'],

  crumbClass: computed.oneWay('breadCrumbs.crumbClass'),
  linkClass: computed.oneWay('breadCrumbs.linkClass'),
  hasBlock: computed.bool('template').readOnly()
});