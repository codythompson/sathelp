/**
 * A module with functions to help with various orbital calcuations.
 * @module orbcalc
 */

/**
 * Calculates the orbital velocity from the given altitude of the major axis.
 * @param {number} altitude - The altitude of the major axis of the orbit, in meters.
 * @param {number} panetRadius - The radius of the planet, in meters.
 * @param {number} accelAtSeaLevel - The acceleration due to gravity at sea level, in meters per seconds squared.
 * @returns {number} The orbital velocity for the given major axis altitude, in meters per second.
 */
var velocityFromAltitude = function (altitude, planetRadius, accelAtSeaLevel) {
  var result = planetRadius * Math.sqrt(accelAtSeaLevel/(planetRadius + altitude));
  return result;
};

/**
 * Calculates the orbital period from the given altitude of the major axis.
 * @param {number} altitude - The altitude of the major axis of the orbit, in meters.
 * @param {number} panetRadius - The radius of the planet, in meters.
 * @param {number} accelAtSeaLevel - The acceleration due to gravity at sea level.
 * @returns {number} The orbital period for the given major axis altitude, in seconds.
 */
var periodFromAltitude = function (altitude, planetRadius, accelAtSeaLevel) {
  var orbVel = velocityFromAltitude(altitude, planetRadius, accelAtSeaLevel);
  var result = 2 * Math.PI * ((planetRadius + altitude) / orbVel);
  return result;
};

/**
 * Calculates the altitude of the major axis from the given altitude.
 * @param {number} orbitalPeriod - The orbital period, in seconds.
 * @param {number} panetRadius - The radius of the planet, in meters.
 * @param {number} accelAtSeaLevel - The acceleration due to gravity at sea level.
 * @returns {number} The major axis altitude, in meters.
 */
var altitudeFromPeriod = function (orbitalPeriod, planetRadius, accelAtSeaLevel) {
  // this formula was created by entering
  // solve t=2Pi((r+h)/(r(g/(r+h))^(1/2))) for h
  // into wolfram alhpa
  var g = accelAtSeaLevel;
  var r = planetRadius;
  var t = orbitalPeriod;
  var h = ((Math.cbrt(g) * Math.pow(r, 2/3) * Math.pow(t, 2/3)) / Math.pow(2 * Math.PI, 2/3)) - r;
  return h;
};

/**
 * Calculates the apogee from the given major axis altitude and desired perigee.
 * @param {number} orbitalPeriod - The orbital period, in seconds.
 * @param {number} panetRadius - The radius of the planet, in meters.
 * @param {number} accelAtSeaLevel - The acceleration due to gravity at sea level.
 * @returns {number} The major axis altitude, in meters.
 */
var apogeeFromMajorAxis = function (majorAxisAltitude, desiredPerigee) {
  var apog = (2*majorAxisAltitude) - desiredPerigee;
  return apog;
};

/**
 * Calculate the major axis of the transfer orbit for placing satellites
 * in the same orbit, but equally "spaced" apart
 * @param {number} desiredAltitude - The altitude of the desired major axis of the orbit, in meters.
 * @param {number} numberOfSatellites - The number of satellites that will be orbiting the body.
 * @param {number} panetRadius - The radius of the planet, in meters.
 * @param {number} accelAtSeaLevel - The acceleration due to gravity at sea level.
 * @returns {number} The apogee of the transfer orbit (perigee should be altitude)
 */
var apogeeEquidistantTransferOrbit = function (desiredAltitude, numberOfSatellites, planetRadius, accelAtSeaLevel) {
  var period = periodFromAltitude(desiredAltitude, planetRadius, accelAtSeaLevel);
  var transferPeriod = period + (period / numberOfSatellites);
  var majAxis = altitudeFromPeriod(transferPeriod, planetRadius, accelAtSeaLevel);
  var apog = apogeeFromMajorAxis(majAxis, desiredAltitude);
  return apog;
};

// module.exports = { // TODO figure out can't do module.exports
export default {
  velocityFromAltitude: velocityFromAltitude,
  periodFromAltitude: periodFromAltitude,
  altitudeFromPeriod: altitudeFromPeriod,
  apogeeFromMajorAxis: apogeeFromMajorAxis,
  apogeeEquidistantTransferOrbit: apogeeEquidistantTransferOrbit
}
