(function() {

  'use strict';

  Polymer({

    is: 'count-up',

    properties: {
      /**
       * Start value.
       */
      startValue: {
        type: Number,
        value: 0
      },

      /**
       * End value.
       */
      endValue: {
        type: Number,
        observer: '_endValueChanged'
      },

      /**
       * Disables the count-up animation at the initial rendering.
       */
      noAutostart: {
        type: Boolean,
        value: false
      },

      /**
       * Number of decimals to show.
       */
      decimals: {
        type: Number,
        value: 0,
        observer: '_decimalsChanged'
      },

      /**
       * Animation duration in seconds.
       */
      duration: {
        type: Number,
        value: 2.5
      },

      /**
       * Disable easing.
       */
      noEasing: {
        type: Boolean,
        value: false
      },

      /**
       * Custom easing function for the animation.
       */
      easingFn: {
        type: Function
      },

      /**
       * Disable grouping by thousands, hundreds, etc.
       */
      noGrouping: {
        type: Boolean,
        value: false
      },

      /**
       * Separator for groups (thousands).
       */
      separator: {
        type: String,
        value: ','
      },

      /**
       * Decimal symbol.
       */
      decimal: {
        type: String,
        value: '.'
      },

      /**
       * Number suffix.
       */
      suffix: {
        type: String
      },

      /**
       * Number prefix.
       */
      prefix: {
        type: String,
        observer: '_prefixChanged'
      },

      _countup: {
        type: Function,
        computed: '_setCountUp(startValue, endValue, decimals, duration)'
      }
    },

    /* global CountUp */
    _setCountUp: function(startValue, endValue, decimals, duration) {
      return new CountUp(this.$.value, Number(startValue), Number(endValue), decimals, duration, {
        useEasing: !this.noEasing,
        easingFn: this.easingFn || null,
        useGrouping: !this.noGrouping,
        separator: this.separator,
        decimal: this.decimal,
        prefix: this.prefix || null,
        suffix: this.suffix || null
      });
    },

    _endValueChanged: function(value) {
      if (!this.noAutostart) {
        this.start();
      }
    },

    /**
     * Start the animation.
     * @param {Object} cb Function to be executed at the end of the animation.
     */
    start: function(cb) {
      this._countup.start(cb);
    },

    /**
     * Reset the count to the startValue.
     */
    reset: function() {
      // this._updateCountup();
      this._countup.reset();
    },

    /**
     * Update the counter to a new value.
     * @param  {Number} value New value.
     */
    update: function(value) {
      this._countup.update(value);
    },

    /**
     * Pause or resume the animation.
     */
    pauseResume: function() {
      this._countup.pauseResume();
    },

    /**
     * Force _setCountup to be executed and return new CountUp
     */
    _updateCountup: function() {
      var previousValue = this.startValue;
      this.startValue = null;
      this.startValue = previousValue;
    },

    _decimalsChanged: function(value, previousValue) {
      if (previousValue !== undefined) {
        setTimeout(() => {
          this.update(this.value); // reevaluate decimals
        }, 1);
      }
    },

    /**
     * This is a stupid observer that does nothing
     * because prefix property if not set without an observer.
     */
    _prefixChanged: function(prefix) {}
  });

}());
