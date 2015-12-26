// C data-viz
import Ember from 'ember';
import c3 from 'c3';
const { Component, computed, A, isEmpty, run, observer } = Ember;

export default Component.extend({
  tagName: 'div',
  classNames: ['c3-chart'],

  data: {}, axis: {}, regions: {}, bar: {}, pie: {}, donut: {}, gauge: {},
  grid: {}, legend: {}, tooltip: {}, subchart: {}, zoom: {}, point: {},
  line: {}, area: {}, size: {}, padding: {}, color: {}, transition: {},

  properties: ['data','axis','regions','bar','pie','donut','gauge',
    'grid','legend','tooltip','subchart','zoom','point','line',
    'area','size','padding','color','transition'],

  _chart: undefined,
  chart: computed('_config', function() {
    if (isEmpty(this.get('_chart'))) {
      // Empty, create it.
      let container = this.$().get(0);
      if (isEmpty(container)) {
        return undefined;
      } else {
        let chart = c3.generate(this.get('_config'));
        this.set('_chart', chart);
        return chart;
      }
    } else {
      // Editor is already created and cached.
      return this.get('_chart');
    }
  }),

  _config: computed(
    'data','axis','regions','bar','pie','donut','gauge',
    'grid','legend','tooltip','subchart','zoom','point',
    'line','area','size','padding','color','transition', 
    function() {
      let p = this.get('properties');
      let c = this.getProperties(...p);
      let self = this;
      new A([
        'oninit',
        'onrendered',
        'onmouseover',
        'onmouseout',
        'onresize',
        'onresized'
      ]).forEach((eventname) => {
        c[eventname] = function() {
          self.sendAction(eventname, this);
        };
      });
      c.bindto = this.$().get(0);
      return c;
  }),

  _renderChart() {
    let chart = this.get('chart');
    let data = this.get('data');
    if ( isEmpty(data) || isEmpty(chart) ) { return; }
    chart.load(data);
  },

  // wait for data to load before trying to render the chart
  debouncer: observer('data', function() {
    run.debounce(this, this._renderChart, 300);
  }),

  didInsertElement() {
    let controller = this.get('targetObject');
    let propertyKey;
    let data = this.get('data');
    for ( let prop in controller ) {
      if ( controller.hasOwnProperty( prop ) && controller[ prop ] === data ) {
        propertyKey = prop;
        break;
      }
    }
    if ( !isEmpty(propertyKey) ) {
      controller.addObserver(propertyKey, this, this._renderChart);
    }
    this._renderChart();
  },

  willDestroyElement() {
    this._super();
    this.get('chart').destroy();
  }
});