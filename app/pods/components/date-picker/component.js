// C date-picker
// port this shit http://www.daterangepicker.com/
import Ember from 'ember';
const { Component, on, run } = Ember;
import moment from 'moment';

export default Component.extend({
  classNames: ['ember-text-field, datepicker'],

  // settings: http://bootstrap-datepicker.readthedocs.org/en/latest/index.html
  clearBtn: true,
  todayBtn: 'linked',
  todayHighlight: true,

  startDate: undefined,
  endDate: undefined,

  setupDatepicker: on('didInsertElement', function() {
    run.scheduleOnce('afterRender', this, () => {
      let propertyKeys = ['autoclose','clearBtn','todayBtn'];
      let propertyValues = this.getProperties(propertyKeys);
      let properties = {};
      for (let key of propertyKeys) { 
        properties[key] = propertyValues;
      }
      this.$('#datepicker').datepicker(properties).
      on('changeDate', (event) => {
        Ember.run(() => {
          if ( event.target.name==='start' ) {
            this.set('startDate', moment(event.date).format('MM/DD/YYYY'));
          } else {
            this.set('endDate', moment(event.date).format('MM/DD/YYYY'));
          }
        });
      });
    });
  }),

  teardownDatepicker: on('willDestroyElement', function() {
    this.set('startDate', undefined);
    this.set('endDate', undefined);
    this.$().datepicker('remove');
  })
});