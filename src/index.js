import turfDistance from '@turf/distance';
import similarity from 'similarity';

export default {
  calculate(distance, name, options = {}) {
    const { minDistance = 10 } = options;
    if (distance > minDistance) return 0;
    return name;
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
        const name = similarity(`${locations[0].name}`, `${location.name}`);
        const distance = turfDistance(locations[0].geojson, location.geojson) * 1000;
        const value = this.calculate(distance, name, options);
        result.push({ name, distance, value });
      }
    });
    return result;
  },
};
