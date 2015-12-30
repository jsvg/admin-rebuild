// C drag-dropzone
import Ember from 'ember';
const { set, Component } = Ember;

export default Component.extend({
  classNames: ['draggableDropzone'],
  classNameBindings: ['dragClass', 'currentlyDragging', 'hoverHighlight:hvr-fade'],
  dragClass: 'deactivated',
  currentlyDragging: false,
  hoverHighlight: true,

  dragLeave(event) {
    event.preventDefault();
    set(this, 'dragClass', 'deactivated');
  },

  dragOver(event) {
    event.preventDefault();
    set(this, 'dragClass', 'activated');
  },

  drop(event) {
    const data = event.dataTransfer.getData('text/data');
    this.sendAction('dropped', data);
    set(this, 'dragClass', 'deactivated');
    set(this, 'currentlyDragging', false);    
  }
});