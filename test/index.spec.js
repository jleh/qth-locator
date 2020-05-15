const qthLocator = require('../src/index');

describe('QTH locator', () => {
  it('Can tell if input is valid locator string', () => {
    expect(qthLocator.isValidLocatorString('KP20le')).toBe(true);
    expect(qthLocator.isValidLocatorString('ZZ20le')).toBe(false);
  });

  const expectCoordinates = (coords, lat, lng) => {
    expect(coords[0]).toBeCloseTo(lat);
    expect(coords[1]).toBeCloseTo(lng);
  };

  const expectBearDist = (BDPair, dist, deg) => {
    expect(BDPair.km).toBeCloseTo(dist);
    expect(BDPair.deg).toBeCloseTo(deg);
  };

  it('Converts locator string to coordinates', () => {
    expectCoordinates(qthLocator.locatorToLatLng('KP20le'), 60.188, 24.958);
    expectCoordinates(qthLocator.locatorToLatLng('FN31pr'), 41.729, -72.708);
    expectCoordinates(qthLocator.locatorToLatLng('FN20'), 40.48, -75.04);
  });

  it('Can calculate distance between two squares', () => {
    expect(qthLocator.distance('KP20le', 'KP21ol')).toBeCloseTo(144.26);
  });

  it('Can calculate distance between two four letter squares', () => {
    expect(qthLocator.distance('KP20', 'FN20')).toBeCloseTo(6673.09);
  });

  it('Can calculate distance and bearing between two far squares', () => {   
    expectBearDist(qthLocator.bearingDistance('FN20qr', 'KP21ol'), 6586.72, 49.16);
  });

  it('Can calculate distance and bearing between two close squares', () => {   
    expectBearDist(qthLocator.bearingDistance('FN20qr', 'FN30qr'), 168.52, 89.35);
  });


});
