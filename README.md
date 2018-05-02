# Detect duplicate locations

## Usage

```
import duplication from '@nearest/nearest-duplicate-location';

```

### Input

```
const locations = [
  {
    geojson: {...geojsonObject},
    name: 'Name of original location',
  },
  {
    geojson: {...geojsonObject},
    name: 'Name of location #1 to compare with original',
  },
  {
    geojson: {...geojsonObject},
    name: 'Name of location #2 to compare with original',
  },
  {
    ...
  }
];
```
### Options

```
const options = {
  minDistance: 10, // minimal distance in meter to determine if identical (default: 10)
  duplicationValue: 0.2432, // minimal similarity value of location name (0.2432)
};

```


### Check
```
const result = duplication.check(locations, options);

```

## Result

Result value describes how identical to locations are. 0 means completaly different,
1 means completaly identical.

```
[
  {               // Result between original and #1
    name: 1,      // text similarity of names
    distance: 0,  // sperical distance between original and #1
    value: 1,     // identical
    isDuplicate: true
    },   
  { name: 0.9,
    distance: 9.891107007312382,
    value: 0.9 },
  { name: 0.14285714285714285,
    distance: 918.318771862209,
    value: 0 } ]

```

### Resources

[Detecting Nearly Duplicated Records in Location Datasets](https://www.microsoft.com/en-us/research/publication/detecting-nearly-duplicated-records-in-location-datasets/)
