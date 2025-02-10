![logo](https://repository-images.githubusercontent.com/24792198/dd93c980-323f-11ea-8a14-a0299de4847a)

# worker-timers

**A replacement for setInterval() and setTimeout() which works in unfocused windows.**

[![version](https://img.shields.io/npm/v/worker-timers.svg?style=flat-square)](https://www.npmjs.com/package/worker-timers)

## Motivation

For scripts that rely on [WindowTimers](http://www.w3.org/TR/html5/webappapis.html#timers) like `setInterval()` or `setTimeout()` things get confusing when the site which the script is running on loses focus. Chrome, Firefox and maybe others throttle the frequency at which they invoke those timers to a maximum of once per second in such a situation. However this is only true for the main thread and does not affect the behavior of [Web Workers](http://www.w3.org/TR/workers/). Therefore it is possible to avoid the throttling by using a worker to do the actual scheduling. This is exactly what `worker-timers` does.

## Getting Started

`worker-timers` is available as a package on [npm](https://www.npmjs.org/package/worker-timers). Run the following command to install it:

```shell
npm install worker-timers
```

You can then import the exported functions in your code like this:

```js
import { clearInterval, clearTimeout, setInterval, setTimeout } from 'worker-timers';
```

The usage is exactly the same (despite of the [error handling](#error-handling) and the
[differentiation between intervals and timeouts](#differentiation-between-intervals-and-timeouts))
as with the corresponding functions on the global scope.

```js
const intervalId = setInterval(() => {
    // do something many times
}, 100);

clearInterval(intervalId);

const timeoutId = setTimeout(() => {
    // do something once
}, 100);

clearTimeout(timeoutId);
```

## Differentiation between Intervals and Timeouts

The native WindowTimers only maintain a single list of timers. But `worker-timers` maintains two separate lists to store the ids of intervals and timeouts internally. WindowTimers allows intervals to be cancelled by calling `clearTimeout()` and the other way round because it stores all timers in a single list. This is not possible with `worker-timers`.

```js
const periodicWork = () => {};

// This will stop the interval.
const windowId = window.setInterval(periodicWork, 100);
window.clearTimeout(windowId);

// This will not cancel the interval. It may cancel a timeout.
const workerId = setInterval(periodicWork, 100);
clearTimeout(workerId);
```

## Server-Side Rendering

This package is intended to be used in the browser and requires the browser to have [support for Web Workers](https://caniuse.com/#feat=webworkers). It does not contain any fallback which would allow it to run in another environment like Node.js which doesn't know about Web Workers. This is to prevent this package from silently failing in an unsupported browser. But it also means that it needs to be replaced when used in a web project which also supports server-side rendering. The replacement should be straightforward, at least in theory, because each function has the exact same signature as its corresponding builtin function. But the configuration of a real-life project can be tricky. For a concrete example, please have a look at the [worker-timers-ssr-example](https://github.com/newyork-anthonyng/worker-timers-ssr-example) provided by [@newyork-anthonyng](https://github.com/newyork-anthonyng). It shows the usage inside of a server-side rendered React app.

## Angular (& Zone.js)

If `worker-timers` is used inside of an Angular app and Zone.js (which is the default) is used to detect changes, the behavior of `worker-timers` can be confusing. Angular is using Zone.js which is patching the native `setInterval()` and `setTimeout()` functions to get notified about the invocation of their callback functions. But Angular (more specifically Zone.js) is not aware of `worker-timers` and doesn't get notified about any callback invocations. Therefore Angular needs to be notified manually about state changes that occur inside of a callback function which was scheduled with the help of `worker-timers`.

## Security contact information

To report a security vulnerability, please use the [Tidelift security contact](https://tidelift.com/security). Tidelift will coordinate the fix and disclosure.
