// C drag-item
import Ember from 'ember';
const { get, Component } = Ember;

export default Component.extend({
  classNames: ['draggableItem'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  dragStart(event) {
    this.sendAction('dragging');
    return event.dataTransfer.setData('text/data', get(this, 'content'));
  },
  dragEnd() {
    this.sendAction('dragging');
  }
});