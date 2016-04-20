# Maybe

Promises for those afraid of commitment. `Maybe` can be used just like `Promise`.

## Browser Support
IE8+, Chrome, Firefox, IOS 4+, Safari 5+, Opera

### Node
```
npm install maybe-polyfill
```
### Bower
```
bower install maybe-polyfill
```

## Simple use
```js
var mayb = new Maybe(function(resolve, reject) {
  // do a thing, possibly async, then…

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }  else {
    reject(new Error("It broke"));
  }
});

// Do something when async done
maybe.then(function() {
  ...
});
```

## Performance
By default maybe-polyfill uses `setImmediate`, but falls back to `setTimeout` for executing asynchronously. If a browser does not support `setImmediate` (IE/Edge are the only browsers with setImmediate), you may see performance issues.
Use a `setImmediate` polyfill to fix this issue. [setAsap](https://github.com/taylorhakes/setAsap) or [setImmediate](https://github.com/YuzuJS/setImmediate) work well.

If you polyfill `window.setImmediate` or use `Maybe._setImmediateFn(immedateFn)` it will be used instead of `window.setTimeout`
```
npm install setasap --save
```
```js
var Maybe = require('maybe-polyfill');
var setAsap = require('setasap');
Maybe._setImmediateFn(setAsap);
```

## Unhandled Rejections
maybe-polyfill will warn you about possibly unhandled rejections. It will show a console warning if a Maybe is rejected, but no `.catch` is used. You can turn off this behavior by setting `Maybe._setUnhandledRejectionFn(<rejectError>)`.
If you would like to disable unhandled rejections. Use a noop like below.
```js
Maybe._setUnhandledRejectionFn(function(rejectError) {});
```


## Testing
```
npm install
npm test
```

## License
MIT
