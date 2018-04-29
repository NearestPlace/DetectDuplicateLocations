import chai from 'chai';
import find from 'lodash.find';
import get from 'lodash.get';
import duplication from '../src/index';

import data from './data';

const expect = chai.expect;

describe('Check if locations are identical', () => {
  it('Check identical', (done) => {
    const locations = data.map(location => ({
      geojson: location.geojson,
      name: get(find(location.elements, { key: 'locationName' }), 'value.0.value'),
    }));
    const result = duplication.check(locations);
    console.log(result);
    done();
  });
});
