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
      let len = group.items.length;
      aggregation.push({ key: group.key, value: (sum/len) });
    });

    return aggregation; 
  }).readOnly();
}