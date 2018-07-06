import turfDistance from '@turf/distance';
import similarity from 'similarity';

export default {
  isDuplicate(values, options) {
    const dupLimit = options.duplicationLimit || 0.2432;
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
      if (i) {
        locations[0].geojson.type = locations[0].geojson.type || 'Feature';
        location.geojson.type = location.geojson.type || 'Feature';
        const name = similarity(`${locations[0].name}`, `${location.name}`);
        const distance = turfDistance(locations[0].geojson, location.geojson) * 1000;
        const value = this.calculate(distance, name, options);
        const isDuplicate = this.isDuplicate({ name, distance, value }, options);
        result.push({ name, distance, value, isDuplicate });
      }
    });
    return result;
  },
};
