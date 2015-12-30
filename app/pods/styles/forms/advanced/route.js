// T styles.forms.advanced
import Ember from 'ember';
const { Route, RSVP } = Ember;
export default Route.extend({
  model() {
    return RSVP.hash({
      users: [
      {id: 1, firstName: 'Trek', lastName: 'Glowacki'  },
      {id: 2, firstName: 'Tom', lastName: 'Dale'},
      {id: 3, firstName: 'Yehuda', lastName: 'Katz'}]
    });
  },
  setupController: function(controller, model) {
    return controller.set('model', model.users);
  }
});