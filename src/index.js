const CHAR_CODE_OFFSET = 65;

const isValidLocatorString = locatorString => locatorString.match(/^[A-R][A-R]\d\d[a-x][a-x]/) !== null;

const charToNumber = (char) => {
  return char.toUpperCase().charCodeAt(0) - CHAR_CODE_OFFSET;
}

const locatorToLatLng = (locatorString) => {
  if (!isValidLocatorString(locatorString)) {
    throw new Error('Input is not valid locator string');
  }

  const squareLng = charToNumber(locatorString[0]) * 20;
  const squareLat = charToNumber(locatorString[1]) * 10;

  const gridLng = Number.parseInt(locatorString[2]) * 2;
  const gridLat = Number.parseInt(locatorString[3]);

  const subsquareLng = (charToNumber(locatorString[4]) + 0.5) / 12;
  const subsquareLat = (charToNumber(locatorString[5]) + 0.5) / 24;

  return [
    squareLat + gridLat + subsquareLat - 90,
    squareLng + gridLng + subsquareLng - 180
  ];
};

module.exports = {
  isValidLocatorString,
  locatorToLatLng
};
