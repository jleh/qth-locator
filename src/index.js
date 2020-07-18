// qth-locator  Copyright 2019 Juuso Lehtinen https://github.com/jleh/qth-locator/  MIT License
'use strict';

const CHAR_CODE_OFFSET = 65;

const isValidLocatorString = locatorString => locatorString.match(/^[A-Ra-r][A-Ra-r]\d\d[A-Xa-x][A-Xa-x]/) !== null;

const charToNumber = char => char.toUpperCase().charCodeAt(0) - CHAR_CODE_OFFSET;
const numberToChar = number => String.fromCharCode(number + CHAR_CODE_OFFSET);

const locatorToLatLng = (locatorString) => {
  locatorString += 'll'; // append subsquare in case is 4 chars long...  If not, is ignored.
  if (!isValidLocatorString(locatorString)) {
    throw new Error('Input is not valid locator string');
  }

  const fieldLng = charToNumber(locatorString[0]) * 20;
  const fieldLat = charToNumber(locatorString[1]) * 10;
  const squareLng = Number.parseInt(locatorString[2]) * 2;
  const squareLat = Number.parseInt(locatorString[3]);
  const subsquareLng = (charToNumber(locatorString[4]) + 0.5) / 12;
  const subsquareLat = (charToNumber(locatorString[5]) + 0.5) / 24;

  return [
    fieldLat + squareLat + subsquareLat - 90,
    fieldLng + squareLng + subsquareLng - 180
  ];
};

const degToRad = deg => (deg % 360) * Math.PI / 180;
const radToDeg = rad => (rad / Math.PI *180) % 360;

const bearingDistance = (from, to) => {
  const fromCoords = locatorToLatLng(from);
  const toCoords = locatorToLatLng(to);
  const dLat = degToRad(toCoords[0] - fromCoords[0]);
  const dLon = degToRad(toCoords[1] - fromCoords[1]);
  const fromLat = degToRad(fromCoords[0]);
  const toLat = degToRad(toCoords[0]);
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat);
  const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const y = (dLon) * Math.cos(fromLat) * Math.cos(toLat);
  const x = Math.sin(toLat) - Math.sin(fromLat) * Math.cos(b);

  let az = Math.atan2(y, x);

  if (az < 0) {
    az += 2 * Math.PI;
  }

  return {
    km: b * 6371,
    deg: radToDeg(az)
  };
};

const distance = (from, to) => bearingDistance(from, to).km;

const isValidPoint = (lat, lng) => (lat >= -90 && lat <= 90) && (lng >= -180 && lng <= 180);

const latLngToLocator = (lat, lng) => {
  if (!isValidPoint(lat, lng)) {
    throw new Error('Input is not a valid coordinate');
  }

  const longitude = lng + 180;
  const latitude = lat + 90;

  const fieldLng = numberToChar(Math.floor(longitude / 20));
  const fieldLat = numberToChar(Math.floor(latitude / 10));

  const squareLng = Math.floor(longitude % 20 / 2);
  const squareLat = Math.floor(latitude % 10);

  const subsquareLng = numberToChar(Math.floor((longitude % 20 % 2) * 12)).toLowerCase();
  const subsquareLat = numberToChar((latitude % 10 - squareLat) * 24).toLowerCase();

  return fieldLng + fieldLat + squareLng + squareLat + subsquareLng + subsquareLat;
};

module.exports = {
  isValidLocatorString,
  locatorToLatLng,
  distance,
  bearingDistance,
  latLngToLocator
};