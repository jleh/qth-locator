const qthLocator = require('./index');

describe('QTH locator', () => {
  it('Can tell if input is valid locator string', () => {
    expect(qthLocator.isValidLocatorString('KP20le')).toBe(true);
    expect(qthLocator.isValidLocatorString('ZZ20le')).toBe(false);
  });

  const expectCoordinates = (coords, lat, lng) => {
    expect(coords[0]).toBeCloseTo(lat);
    expect(coords[1]).toBeCloseTo(lng);
  };

  it('Converts locator string to coordinates', () => {
    expectCoordinates(qthLocator.locatorToLatLng('KP20le'), 60.188, 24.958);
    expectCoordinates(qthLocator.locatorToLatLng('FN31pr'), 41.729, -72.708);
  });
});
