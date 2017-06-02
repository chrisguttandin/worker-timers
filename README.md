# worker-timers

**A replacement for setInterval() and setTimeout() which works in unfocused windows.**

[![tests](https://img.shields.io/travis/chrisguttandin/worker-timers/master.svg?style=flat-square)](https://travis-ci.org/chrisguttandin/worker-timers)
[![dependencies](https://img.shields.io/david/chrisguttandin/worker-timers.svg?style=flat-square)](https://www.npmjs.com/package/worker-timers)
[![version](https://img.shields.io/npm/v/worker-timers.svg?style=flat-square)](https://www.npmjs.com/package/worker-timers)

## Motivation

For scripts that rely on [WindowTimers](http://www.w3.org/TR/html5/webappapis.html#timers) like
setInterval() or setTimeout() things get confusing when the site which the script is running on
loses focus. Chrome, Firefox and maybe others throttle the frequency of firing those timers to a
maximum of once per second in such a situation. However this is only true for the main thread and
does not affect the behavior of [Web Workers](http://www.w3.org/TR/workers/). Therefore it is
possible to avoid the throttling by using a worker to do the actual scheduling. This is exactly what
WorkerTimers do.

## Getting Started

WorkerTimers are available as a package on [npm](https://www.npmjs.org/package/worker-timers).
Simply run the following command to install it:

```shell
npm install worker-timers
```

You can then require the workerTimers instance from within your code like this:

```js
import * as workerTimers from 'worker-timers';
```

The usage is exactly the same as with the corresponding functions on the global scope.

```js
var intervalId = workerTimers.setInterval(() => {
    // do something many times
}, 100);

workerTimers.clearInterval(intervalId);

var timeoutId = workerTimers.setTimeout(() => {
    // do something once
}, 100);

workerTimers.clearTimeout(timeoutId);
```
