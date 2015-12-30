// C drag-item
import Ember from 'ember';
const { get, Component } = Ember;
/**
 * Drag-Item Component
 *
 * Component wraps HTML content into a draggable UI item that can be
 * dropped on the drag-dropzone component
 *
 * @module
 * @example <caption>Usage of component</caption>
 * {{#drag-item content=item.id dragging='dragging'}}
 *   <li>{{item.id}}</li>
 * {{/drag-item}}
 * @see app/pods/components/drag-dropzone
 * @augments ember/Component
 */
export default Component.extend({
  classNames: ['draggableItem'],
  attributeBindings: ['draggable'],
  draggable: 'true',

  /**
   * Drag start HTML5 event handler
   *
   * <i>sendAction: "dragging"</i>
   * <caption>Drag start event fired once when component dragging begins</caption>
   *
   * @function
   * @param {String} event Drop event
   * @returns {String} Content attribute passed in from template host
   */
  dragStart(event) {
    this.sendAction('dragging');
    return event.dataTransfer.setData('text/data', get(this, 'content'));
  },
  /**
   * Drag end HTML5 event handler
   *
   * <i>sendAction: "dragging"</i>
   * <caption>Drag end event fired once when component dragging begins</caption>
   *
   * @function
   */
  dragEnd() {
    this.sendAction('dragging');
  }
});