import turfDistance from '@turf/distance';
import similarity from 'string-similarity';
import get from 'lodash.get';
import set from 'lodash.set';

export default {
  isDuplicate(values, options) {
    const dupLimit = options.duplicationLimit || 0.6;
    return (values.value > dupLimit);
  },

  calculate(distance, name, options = {}) {
    const { minDistance = 10 } = options;
    return (distance > minDistance) ? 0 : name;
  },

  /* checkName(names = [], options = {}) {
    return similarity(`${names[0]}`, `${names[1]}`);
  },
  checkDistance(geojsons = [], options = {}) {
    return turfDistance(geojsons[0], geojsons[1]) * 1000;
  }, */

  check(locations = [], options = {}) {
    if (!Array.isArray(locations) || !locations.length) return null;
    const result = [];
    locations.forEach((location, i) => {
      if (i) { // Skip first element, b/c it is the baseLocation
        const baseLocation = { ...locations[0] };
        const testLocation = { ...location };
        set(baseLocation, 'geojson.type', get(baseLocation, 'geojson.type') || 'Feature');
        set(testLocation, 'geojson.type', get(testLocation, 'geojson.type') || 'Feature');
        const name = similarity.compareTwoStrings(`${baseLocation.name}`, `${testLocation.name}`);
        const distance = turfDistance(baseLocation.geojson, testLocation.geojson) * 1000;
        const value = this.calculate(distance, name, options);
        const isDuplicate = this.isDuplicate({ name, distance, value }, options);
        result.push({ name, distance, value, isDuplicate });
      }
    });
    return result;
  },
};
