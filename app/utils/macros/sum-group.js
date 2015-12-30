import Ember from 'ember';
const { A, computed, get } = Ember;

/**
 * Returns an Ember object with summed values for each unique key.
 *
 * Ember.Object.extend({
 *   items: [{ id: 1, name: 'foo' }, { id: 2, name: 'bar' }],
 *   selectedItem: { id: 1, name: 'foo' },
 *   notSelectedItems: collectionWithoutKey('items', 'selectedItem')
 * });
 *
 * @param {Object} groups An Ember object resulted from the group-by method
 * @param {String} aggregateOn The key name for the property to aggregate
*/

export default function macrosAvgGroup(groups, aggregateOn) {
  const dependentKey = groups + '.@each.' + aggregateOn;

  return computed(dependentKey, function() {
    let aggregation = new A();
    const groups = get(this, 'groups');

    groups.map( (group) => {
      let sum = group.items.getEach(aggregateOn).reduce( (a,b)=>{
        return a+b;
      });
      aggregation.push({ key: group.key, value: sum });
    });

    return aggregation; 
  }).readOnly();
}