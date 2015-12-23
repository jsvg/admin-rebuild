// application
import Ember from 'ember';

export default Ember.Controller.extend({
  sidebarData: [
    {
      isTitle: true,
      text: 'MAIN NAVIGATION'
    },
    {
      isMenu: true,
      text: 'Dashboard',
      linkTo: 'index',
      icon: 'fa fa-dashboard'
    },
    {
      isTree: true,
      text: 'Visualizations',
      icon: 'fa fa-pie-chart',
      children: [
        {
          text: 'C3.js Basic',
          linkTo: 'index',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'DS.js Complex',
          linkTo: 'index',
          icon: 'fa fa-circle-o'
        }
      ]
    },
    {
      isTitle: true,
      text: 'UI ELEMENTS'
    },
    {
      isTree: true,
      text: 'UI Elements',
      icon: 'fa fa-laptop',
      children: [
        {
          text: 'General',
          linkTo: 'styles.ui.general',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'Icons',
          linkTo: 'styles.ui.icons',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'Buttons',
          linkTo: 'styles.ui.buttons',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'Modals',
          linkTo: 'styles.ui.buttons',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'Stat Boxes',
          linkTo: 'styles.ui.buttons',
          icon: 'fa fa-circle-o'
        }
      ]
    },
    {
      isTree: true,
      text: 'Forms and Filters',
      icon: 'fa fa-edit',
      children: [
        {
          text: 'General Elements',
          linkTo: 'styles.forms.general',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'Advanced Elements',
          linkTo: 'styles.forms.advanced',
          icon: 'fa fa-circle-o'
        }
      ]
    },
    {
      isTree: true,
      text: 'Tables',
      icon: 'fa fa-table',
      children: [
        {
          text: 'Simple Tables',
          linkTo: 'styles.tables.simple',
          icon: 'fa fa-circle-o'
        },
        {
          text: 'Data Tables',
          linkTo: 'styles.tables.data',
          icon: 'fa fa-circle-o'
        }
      ]
    },
    {
      isTree: true,
      text: 'Example Pages',
      icon: 'fa fa-folder',
      children: [
        {
          text: '404 Error',
          linkTo: 'styles.templates.404',
          icon: 'fa fa-circle-o'
        }
      ]
    }
  ]
});
