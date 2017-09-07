var orbcalc = require ('./orbcalc');

window.BabelTestClass = class {
    constructor () {

        this.check = 42;
    }

    get hmm () {
        return this.check;
    }
    set hmm (newVal) {
        this.check = newVal
    }
};

window.orbcalc = orbcalc;
