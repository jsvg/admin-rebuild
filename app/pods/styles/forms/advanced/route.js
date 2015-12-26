// T styles.forms.advanced
import Ember from 'ember';
const { Route } = Ember;
export default Route.extend({
  actions: {
    one() {
      console.log('me');
    }
  }
});