# qth-locator

Operations with [Maidenhead locator system](https://en.wikipedia.org/wiki/Maidenhead_Locator_System)

## Usage

```javascript
const { locatorToLatLng, distance, bearingDistance, latLngToLocator } = require('qth-locator');

locatorToLatLng('IO91wm'); // [51.521, -0.125]
distance('IO91wm', 'KP20le'); // 1821.5 km
bearingDistance('FN20qr', 'KP21ol') // 6586.72 km, 49.16 degrees
latLngToLocator(60.179, 24.945) // KP21le
```

## License

MIT
