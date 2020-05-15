// qth-locator  Copyright 2019 Juuso Lehtinen https://github.com/jleh/qth-locator/  MIT License
"use strict";

var CHAR_CODE_OFFSET = 65;

const isValidLocatorString = locatorString => locatorString.match(/^[A-R][A-R]\d\d[a-x][a-x]/) !== null;

const charToNumber = (char) => {
  return char.toUpperCase().charCodeAt(0) - CHAR_CODE_OFFSET;
}

const locatorToLatLng = (locatorString) => {
  locatorString += 'll';  //append subsquare in case is 4 chars long...  If not, is ignored. 
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

const degToRad = deg => (deg % 360) * Math.PI /180;
const radToDeg = rad => (rad / Math.PI *180 ) % 360 ; 

const bearingDistance = (from, to) => {
  const fromCoords = locatorToLatLng(from);
  const toCoords = locatorToLatLng(to);
  const dLat = degToRad(toCoords[0] - fromCoords[0]);
  const dLon = degToRad(toCoords[1] - fromCoords[1]);
  const fromLat = degToRad(fromCoords[0]);
  const toLat = degToRad(toCoords[0]);
  const a = Math.pow(Math.sin(dLat / 2), 2) + Math.pow(Math.sin(dLon / 2), 2) * Math.cos(fromLat) * Math.cos(toLat);
  const b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var az = Math.atan2((dLon) * Math.cos(fromLat) * Math.cos(toLat),
                    Math.sin(toLat) - Math.sin(fromLat) * Math.cos(b));
	if (az < 0) {
		az += 2 * Math.PI;
	}
  return { 
    km: b * 6371,
    deg: radToDeg(az)
  }

};


const distance = (from, to) => {
  let bd = bearingDistance(from, to);
  return(bd.km);
}




module.exports = {
  isValidLocatorString: isValidLocatorString,
  locatorToLatLng: locatorToLatLng,
  distance: distance,
  bearingDistance: bearingDistance
};