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
        value: null
      },

      _startValue: {
        type: Number,
        computed: '_computeStartValue(_previousEndValue, startValue, updateTo)'
      },

      /**
       * End value.
       */
      endValue: {
        type: Number,
        observer: '_endValueChanged'
      },

      /**
       * Update the current value from previous updateTo value instead of counting from startValue to endValue.
       * endValue has no effect when updateTo is used.
       */
      updateTo: {
        type: Number,
        value: null,
        observer: '_updateToChanged'
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
        type: Function,
        value: null
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
       * Optional text after the number.
       */
      suffix: {
        type: String,
        value: null
      },

      /**
       * Optional text before the number.
       */
      prefix: {
        type: String,
        value: null
      },

      /**
       * Set to true to restart the animation when a configuration property is changed.
       * By default, only changing the endValue will animate the counter if noAutostart is not set to true.
       */
      restartOnOptionsChanged: {
        type: Boolean,
        value: false
      },

      _countup: {
        type: Function,
        observer: '_countupChanged',
        computed: '_setCountUp(_startValue, endValue, decimals, duration, updateTo, prefix, suffix, separator, noGrouping, easingFn, noEasing)'
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

    _countupChanged: function(countup) {
      if (this.updateTo && !this._updated) {
        this.start();
      }

      if (this._updated && this.restartOnOptionsChanged) {
        this.start();
      }

      this._updated = true;
    },

    /**
     * Start the animation.
     * @param {Object} cb Function to be executed at the end of the animation.
     */
    start: function(cb) {
      this._countup.start(cb);
    },

    /**
     * Restarts the animation.
     * Shortcut for reset + start.
     * @param {Object} cb Function to be executed at the end of the animation.
     */
    restart: function(cb) {
      this.reset();
      this.start(cb);
    },

    /**
     * Reset the count to the startValue.
     */
    reset: function() {
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

    _computeStartValue: function(previousEndValue, startValue, updateTo) {
      if (updateTo) {
        return !startValue ? previousEndValue : startValue;
      } else {
        return startValue;
      }
    },

    _updateToChanged: function(updateTo) {
      this.endValue = updateTo;
    },

    _endValueChanged: function(endValue, previousValue) {
      this._previousEndValue = previousValue !== undefined ? previousValue : 0;

      if (!this.noAutostart && this._countup) {
        this.start();
      }
    },

    _decimalsChanged: function(value, previousValue) {
      if (previousValue !== undefined) {
        setTimeout(() => {
          this.update(this.endValue); // reevaluate decimals
        }, 1);
      }
    }
  });

}());
