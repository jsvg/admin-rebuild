// T styles.forms.advanced
import Ember from 'ember';
const { computed, get } = Ember;

export default Ember.Controller.extend({
  currentlyDragging: false,
  selectedUsers: Ember.A([]),
  remainingUsers: computed.setDiff('model', 'selectedUsers'),
  remainingUsersLength: computed.alias('remainingUsers.length'),
  
  actions: {
    addUser(userId) {
      const selectedUsers = get(this, 'selectedUsers'),
            user = get(this, 'model').findBy('id', parseInt(userId));

      if (!selectedUsers.contains(user)) {
        return selectedUsers.pushObject(user);
      }
    },

    addAllUsers() {
      const remainingUsers = get(this, 'remainingUsers');
      return get(this, 'selectedUsers').pushObjects(remainingUsers);
    },

    removeUser(user) {
      return get(this, 'selectedUsers').removeObject(user);
    },

    removeAllUsers() {
      return get(this, 'selectedUsers').clear();
    },

    dragging() {
      this.toggleProperty('currentlyDragging');
    }
  }
});