# qth-locator

Operations with [Maidenhead locator system](https://en.wikipedia.org/wiki/Maidenhead_Locator_System)

## Operations

```javascript
const { locatorToLatLng, distance } = require('qth-locator');

locatorToLatLng('IO91wm'); // [51.521, -0.125]
distance('IO91wm', 'KP20le'); // 1821.5 km
```

## License

MIT
