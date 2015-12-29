import Ember from 'ember';
const { A, computed, get } = Ember;

export default function macrosAvgGroup(groups, aggregateOn) {
  const dependentKey = groups + '.@each.' + aggregateOn;

  return computed(dependentKey, function() {
    let aggregation = A();
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