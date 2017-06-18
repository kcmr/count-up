(function() {

  'use strict';

  /* global CountUp */

  Polymer({

    is: 'count-up',

    properties: {
      value: {
        type: Number,
        observer: '_valueChanged'
      },

      _previousValue: Number,

      decimals: {
        type: Number,
        value: 0,
        observer: '_updateCountUp'
      },

      duration: {
        type: Number,
        value: 2.5
      },

      noEasing: {
        type: Boolean,
        value: false
      },

      noGrouping: {
        type: Boolean,
        value: false
      },

      separator: {
        type: String,
        value: ','
      },

      decimal: {
        type: String,
        value: '.'
      },

      _countup: {
        type: Function,
        computed: '_setCountUp(value, _previousValue, decimals, duration)'
      }
    },

    _setCountUp: function(value, previousValue, decimals, duration) {
      return new CountUp(this.$.value, Number(previousValue), Number(value), decimals, duration, {
        useEasing: !this.noEasing,
        useGrouping: !this.noGrouping,
        separator: this.separator,
        decimal: this.decimal
      });
    },

    _valueChanged: function(value, previousValue) {
      this._previousValue = previousValue === undefined ? 0 : previousValue;
      this.start();
    },

    start: function(cb) {
      this._countup.start(cb);
    },

    reset: function() {
      this._countup.reset();
    },

    update: function(value) {
      this._countup.update(value);
    },

    _updateCountUp: function(value, previousValue) {
      if (previousValue !== undefined) {
        setTimeout(() => {
          this.update(this.value); // reevaluate decimals
        }, 1);
      }
    }
  });

}());
