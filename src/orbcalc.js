var orbitalVelocity = function (orbitalAltitude, planetRadius, accelAtSeaLevel) {
  var result = planetRadius * Math.sqrt(accelAtSeaLevel/(planetRadius + orbitalAltitude));
  return result;
};

var orbitalPeriod = function (orbitalAltitude, planetRadius, accelAtSeaLevel) {
  var orbVel = orbitalVelocity(orbitalAltitude, planetRadius, accelAtSeaLevel);
  var result = 2 * Math.PI * ((planetRadius + orbitalAltitude) / orbVel);
  return result;
};

var orbitalAltitude = function (orbitalPeriod, planetRadius, accelAtSeaLevel) {
  // this formula was created by entering
  // solve t=2Pi((r+h)/(r(g/(r+h))^(1/2))) for h
  // into wolfram alhpa
  var g = accelAtSeaLevel;
  var r = planetRadius;
  var t = orbitalPeriod;
  var h = ((Math.cbrt(g) * Math.pow(r, 2/3) * Math.pow(t, 2/3)) / Math.pow(2 * Math.PI, 2/3)) - r;
  return h;
};

module.exports.orbitalVelocity = orbitalVelocity;
module.exports.orbitalPeriod = orbitalPeriod;
module.exports.orbitalAltitude = orbitalAltitude;
