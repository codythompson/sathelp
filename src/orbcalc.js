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
  // TODO
  throw "TODO not implemented";
};

module.exports.orbitalVelocity = orbitalVelocity;
module.exports.orbitalPeriod = orbitalPeriod;
