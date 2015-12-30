import Ember from 'ember';
const { A, computed, get } = Ember;

export default function macrosLenGroup(groups, aggregateOn) {
  const dependentKey = groups + '.@each.' + aggregateOn;

  return computed(dependentKey, function() {
    let aggregation = new A();
    const groups = get(this, 'groups');

    groups.map( (group) => {
      aggregation.push({ key: group.key, value: group.items.length });
    });

    return aggregation;
  }).readOnly();
}