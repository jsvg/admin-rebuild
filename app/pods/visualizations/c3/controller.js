import Ember from 'ember';
const { Controller, computed } = Ember;
import groupBy from '../../../utils/macros/group-by';
import sumGroup from '../../../utils/macros/sum-group';

export default Controller.extend({
  queryParams: ['activity','institute'],
  activity: computed.alias('selectedCode'),
  institute: computed.alias('selectedIC'),
  selectedCode: undefined,
  selectedIC: undefined,

  _allActivities: computed.mapBy('model', 'ACTIVITY'),
  _allICs: computed.mapBy('model', 'IC_NAME'),
  ICs: computed.uniq('_allICs'),
  activityCodes: computed.uniq('_allActivities'),

  relevantProps: ['ACTIVITY','ORG_NAME','IC_NAME','TOTAL_COST'],

  filteredProjects: computed('activity', 'institute', 'model', function() {
    let activity = this.getWithDefault('activity', undefined);
    let institute = this.getWithDefault('institute', undefined);
    let projects = this.get('model');
    if (activity && institute) {
      return projects.filterBy('ACTIVITY', activity).filterBy('IC_NAME', institute).map((project) => {
        return project.getProperties(...this.get('relevantProps'));
      });
    } else if (activity) {
      return projects.filterBy('ACTIVITY', activity).map((project) => {
        return project.getProperties(...this.get('relevantProps'));
      });
    } else if (institute) {
      return projects.filterBy('IC_NAME', institute).map((project) => {
        return project.getProperties(...this.get('relevantProps'));
      });
    } else {
      return projects;
    }
  }),

  // filtered visualization
  modelData: computed.alias('filteredProjects'),
  _costs: computed.mapBy('modelData', 'TOTAL_COST'),
  _orgs: computed.mapBy('modelData', 'ORG_NAME'),
  data: computed('_costs', '_orgs', function() {
    let columns = this.get('_costs');
    let labels = this.get('_orgs');
    columns.unshift('Total Cost');
    labels.unshift('x');
    let data = {
      x: 'x',
      columns: [labels, columns],
      type: 'area-spline',
      order: 'asc'
    };
    return data;
  }),

  // grouped visualization
  groups: groupBy('model', 'IC_NAME'),
  sumGroups: sumGroup('groups', 'TOTAL_COST'),
  groupedData: computed('sumGroups', function() {
    let sg = this.get('sumGroups');
    let labels = sg.getEach('key'),
        cols = sg.getEach('value');
    labels.unshift('x');
    cols.unshift('IC Names');
    let data = {
      x: 'x',
      columns: [labels, cols],
      type: 'bar'
    };
    return data;
  }),

  // viz options
  axis: {
    x: {
      type: 'category'
    },
    y: {
      label: {
        text: 'Total Cost',
        position: 'outer-middle'
      }
    }
  },
  legend: {
    show: true,
  },
  padding: {
    bottom: 35
  },


  actions: {
    selectCode(event) {
      this.set('selectedCode', event.target.value || []);
    },
    selectIC(event) {
      this.set('selectedIC', event.target.value || []);
    }
  }

});