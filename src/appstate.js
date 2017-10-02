/**
 * @module AppState
 * 
 * My attempt at a state manager.
 * Is the "source of truth" for the web app.
 * 
 * TODO:
 * I'd like to one day hook this up to a REST API
 * Maybe take a look at replacing this with Vuex
 */

var celBodyInfo = require('./data/celBodiesInfo.json');

// TODO callbacks or something to handle async set ops
var AppState = {
    debug: true,
    state: {
        version: '0.0.1',
        celBodyInfo: celBodyInfo,
        selectedPlanetIx: 2,
        selectedSatIx: null,
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
        },
        version: function (newVal) {
            return {
                invalid: true,
                message: 'version is a readonly field'
            };
        }
    },

    /**
     * @method isBusy
     * Checks to see if the provided field can be set
     * @param field - the field to check
     */
    isBusy: function (field) {
        return locks[field];
    },

    /**
     * @method set
     * Sets the specified field to the specified value, if possible.
     * @param field - the field to set
     * @param newVal - the value to set the field to
     */
    set: function (field, newVal) {
        if (this.debug) {
            console.log('[AppState][set] changeing ' + field + ' to ' + newVal);
        }

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