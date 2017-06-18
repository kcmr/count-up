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
      },

      separator: String,
      decimal: String
    },

    _countup: function(from, to) {
      return new CountUp(this.$.value, from, to, this.decimals, this.duration, {
        useEasing: !this.noEasing,
        useGrouping: !this.noGrouping,
        separator: this.separator,
        decimals: this.decimal
      });
    },

    _valueChanged: function(value, previousValue) {
      if (previousValue === undefined) {
        previousValue = 0;
      }

      this.countup = this._countup(Number(previousValue), Number(value));
      this.start();
    },

    start: function() {
      this.countup.start();
    },

    reset: function() {
      this.countup.reset();
    },

    update: function() {
      this.countup.update();
    }
  });

}());
