/*
 * Group-by util
 *
 * Pivot ember model based on a provided model property.
 * Returns an ember array with an object containing a unique property
 * key and an items array with the model's associated items
 *
 * @module group-by
 */
import Ember from 'ember';
const { A, computed, get } = Ember;

export default function macrosGroupBy(model, property) {
  const dependentKey = model + '.@each.' + property;

  return computed(dependentKey,  function() {
    let groups = new A();
    const data = get(this, model),
          uniqueKeys = data.getEach(property).uniq();
    
    uniqueKeys.map( (key) => {
      let group = { key: key, items: data.filterBy(property, key) };
      groups.push(group);
    });

    return groups;
  }).readOnly();
}