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

      decimals: {
        type: Number,
        value: 0
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
      }
    },

    _countup: function(from, to) {
      return new CountUp(this.$.value, from, to, this.decimals, this.duration, {
        useEasing: !this.noEasing,
        useGrouping: !this.noGrouping
      });
    },

    _valueChanged: function(value, previousValue) {
      if (previousValue === undefined) {
        previousValue = 0;
      }

      var countup = this._countup(previousValue, value);
      countup.start();
    }
  });

}());
