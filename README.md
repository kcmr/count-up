# &lt;count-up&gt; 

[__Check out the demo__](https://kcmr.github.io/count-up/components/count-up/demo/index.html)

`<count-up>` is a wrapper component for [CountUp.js](https://github.com/inorganik/countUp.js) that displays an animated count up (or down) with configurable options like the duration, the easing function for the animation or the decimal separator, etc.
For examples of the easing function, check out [CountUp's demo](http://inorganik.github.io/countUp.js/).

<!---
```html
<custom-element-demo>
  <template>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="count-up.html">
    <style>
    count-up { font-family: sans-serif; font-size: 100px; }
    </style>
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
--> 

```html
<count-up start-value="100" end-value="2000"></count-up>
```

__Update the current value from the previous `updateTo` value instead of `startValue`:__

```html
<count-up update-to="[[someValue]]"></count-up>
```
```js
_onSomeValueChanged: function(value) {
  this.someValue = value;
}
```

__With decimals and custom decimal separators:__
```html
<count-up decimals="2" decimal="," separator="."></count-up>
```

## Styling

The following custom properties and mixins are available for styling:

| Custom property | Description            | Default |
| :-------------- | :--------------------- | :------ |
| --count-up      | Mixin applied to :host | {}      |
