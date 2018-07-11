import turfDistance from '@turf/distance';
import similarity from 'similarity';

const tick = (items, action, index = 0, finished) => {
  if (index === items.length) {
    finished(true);
    return;
  }
  process.nextTick(() => {
    const item = items[index];
    action(item, index);
    tick(items, action, index + 1, finished);
  });
};

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
    return new Promise((resolve) => {
      tick(locations, (location, i) => {
        if (i) {
          const srcLocation = locations[0];
          const testLocation = location;
          srcLocation.geojson.type = srcLocation.geojson.type || 'Feature';
          testLocation.geojson.type = testLocation.geojson.type || 'Feature';
          const name = similarity(`${srcLocation.name}`, `${testLocation.name}`);
          const distance = turfDistance(srcLocation.geojson, testLocation.geojson) * 1000;
          const value = this.calculate(distance, name, options);
          const isDuplicate = this.isDuplicate({ name, distance, value }, options);
          result.push({ name, distance, value, isDuplicate });
        }
      }, 0, () => {
        resolve(result);
      });
    });
  },
};
