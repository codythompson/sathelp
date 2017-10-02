var CB = require('class-builder');
var _ = require('lodash');
var mathjs = require('mathjs');

var unitInfo = {
    m: {
        name: 'Meters',
        factor: 1
    },
    km: {
        name: 'Kilometers',
        factor: 1000
    }
};

var unitKeys = _.reduce(unitInfo, function (result, info, key) {
    result[info.name] = key;
    return result;
}, {});

var buttonGroupLabels = _.map(Object.keys(unitInfo), function (key) {
    return {
        name: key,
        label: key,
    };
});

var DistanceFormatter = class {
    constructor (args) {
        CB.new('DistanceFormatter');
        CB.field('units');
        CB.default('units', unitKeys.Meters);
        CB.field('roundOffPrecisionErrors')
        CB.default('roundOffPrecisionErrors', true);
        CB.field('roundOffPrecision')
        CB.default('roundOffPrecision', 14);
        CB.build().call(this, args);
    }

    roundOff (num) {
        var formatted = mathjs.format(num, {precision: this.roundOffPrecision});
        return mathjs.eval(formatted); // convert it back into a number
    }

    format (meters) {
        var factor = unitInfo[this.units].factor;
        var formatted = meters * (1/factor);
        if (this.roundOffPrecisionErrors) {
            formatted = this.roundOff(formatted);
        }
        return formatted+'';
    }

    parse (distance) {
        distance = Number(distance.trim());
        var factor = unitInfo[this.units].factor;
        var parsed = distance * factor;
        if (this.roundOffPrecisionErrors) {
            parsed = this.roundOff(parsed);
        }
        return parsed;
    }
};

DistanceFormatter.UnitInfo = unitInfo;
DistanceFormatter.UnitKeys = unitKeys;
DistanceFormatter.ButtonGroupLabels = buttonGroupLabels;


// module.exports = { // TODO figure out can't do module.exports
export {DistanceFormatter as default};