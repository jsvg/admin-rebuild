// C data-viz
import Ember from 'ember';
import c3 from 'c3';
const { Component, computed, run } = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['c3-chart'],

  properties: ['data','axis','regions','bar','pie','donut','gauge',
    'grid','legend','tooltip','subchart','zoom','point','line',
    'area','size','padding','color','transition'],

  c3chart: undefined,

  config: computed('data', 'legend', function() {
    let c = this.getProperties(...this.get('properties'));
    c.bindto = this.$().get(0);
    return c;
  }),

  didUpdateAttrs() {
    run.debounce(this, this.get('_render'), 50);
  },

  _render() {
    this.get('c3chart').load(this.get('data'));
  },

  didInsertElement() {
    this.set('c3chart', c3.generate(this.get('config')));
    this.get('_render');
  },

  willDestroyElement() {
    this._super();
    this.get('c3chart').destroy();
  }
});