var celBodyInfo = require('./data/celBodiesInfo.json');

// TODO callbacks or something to handle async set ops
var AppState = {
    debug: true,
    state: {
        celBodyInfo: celBodyInfo,
        selectedPlanetIx: 2,
        selectedMoonIx: null,
        orbAlt: 200000,
        satCount: 4
    },

    // WARNING: This method of locking out fields
    // only works in synchronous land (i.e. browser)
    // this won't function correctly in an asynch environment
    locks: {
    },

    validators: {
        celBodyInfo: function (newVal) {
            return {
                invalid: true,
                message: 'celBodyInfo is a readonly field'
            };
        }
    },

    isBusy: function (field) {
        return locks[field];
    },

    set: function (field, newVal) {
        if (!this.state.hasOwnProperty(field)) {
            throw '[AppState][set] Attempted to set unknown field ' + field;
        }

        // WARNING: This method of locking out fields
        // only works in synchronous land (i.e. browser)
        // this won't function correctly in an asynch environment
        if (this.locks[field]) {
            if (this.debug) {
                console.warn('[AppState][set] Attempted to set locked field', field);
            }
            return;
        } else {
            this.locks[field] = true;
        }

        if (this.validators[field]) {
            var validateResult = this.validators[field](newVal);
            if (validateResult.invalid) {
                throw '[AppState][set] ' + validateResult.message;
            }
        }

        // TODO 
        this.state[field] = newVal;

        this.locks[field] = false;
    }
};

module.exports = AppState;