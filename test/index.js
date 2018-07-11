import chai from 'chai';
import find from 'lodash.find';
import get from 'lodash.get';
import duplication from '../dist/index';

import data from './data';

const expect = chai.expect;

describe('Check if locations are identical', () => {
  it('Check identical', (done) => {
    const locations = data.map(location => ({
      geojson: location.geojson,
      name: get(find(location.elements, { key: 'locationName' }), 'value.0.value'),
    }));
    duplication.check(locations)
      .then((result) => {
        console.log({ result });
        done();
      });
    // console.log(result);
    // done();
  });

  /* it('Check identical', (done) => {
    import testdata from './testdata';
    const duplicates = [];
    const posDuplicates = [];
    testdata.forEach((d, i) => {
      const location2check = {
        geojson: [Number(d.geocoords_lng), Number(d.geocoords_lat)],
        name: d.name,
      };
      testdata.forEach((c, h) => {
        if (i !== h) { // dont check yourself
          const l = {
            geojson: [Number(c.geocoords_lng), Number(c.geocoords_lat)],
            name: c.name,
          };
          const duplicationValue = duplication.check([location2check, l]);
          const sum = `"${d.name}",${d.id},"${c.name}",${c.id},${Number(duplicationValue[0].value.toFixed(4))},${Number(duplicationValue[0].distance.toFixed(4))}`;
          if (duplicationValue[0].value > 0.2432) duplicates.push(sum);
          else if (duplicationValue[0].value > 0
            && duplicationValue[0].value < 0.2432) posDuplicates.push(sum);
        }
      });
    });

    console.log('Found duplicates - ------------------------------------------');
    duplicates.forEach((d) => { console.log(d); });
    console.log('Possible duplicates - ---------------------------------------');
    posDuplicates.forEach((d) => { console.log(d); });
    done();
  }).timeout(50000); */
});
