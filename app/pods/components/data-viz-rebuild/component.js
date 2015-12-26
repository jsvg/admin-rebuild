/*
 * Bare min req'd for c3 viz
 * grab component ctrlr and
 * $E.set('data', this.get('data2'))
 * update refired by observer
 */
import Ember from 'ember';
import c3 from 'c3';
const { Component, computed, observer } = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['c3-chart'],

  data: {
    x: 'x',
    columns: [
      ['x','a','b','c','d','e', 'f'],
      ['data1', 30, 200, 100, 400, 150, 250],
      ['data2', 50, 20, 10, 40, 15, 25]
    ]
  },

  data2: {
    x: 'x',
    columns: [
      ['x', 'd','e','f','q','w', 'z'],
      ['data1', 50, 300, 200, 500, 120, 150],
      ['data2', 50, 2, 1, 4, 5, 5]
    ]
  },

  axis: { 
    x: {
      type: 'category',  
    }
  },

  c3chart: undefined,

  // fires 2nd
  config: computed('data', function() {
    let c = this.getProperties(['data', 'axis']);
    c.bindto = this.$().get(0);
    return c;
  }),

  // fires on change
  renderChart: observer('data', function() {
    this.get('c3chart').load(this.get('data'));
  }),

  // fires 1st
  didInsertElement() {
    let chart = c3.generate(this.get('config'));
    this.set('c3chart', chart);
    this.renderChart();
  }
});