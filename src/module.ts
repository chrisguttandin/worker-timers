import { load } from 'worker-timers-broker';
import { createLoadWorkerTimers } from './factories/load-worker-timers';
import { worker } from './worker/worker';

export * from './types';

const loadWorkerTimers = createLoadWorkerTimers(load, worker);

import { TWorkerTimers } from './types';

export const clearInterval: TWorkerTimers['clearInterval'] = (timerId) => loadWorkerTimers()
    .clearInterval(timerId);

export const clearTimeout: TWorkerTimers['clearTimeout'] = (timerId) => loadWorkerTimers()
    .clearTimeout(timerId);

export const setInterval: TWorkerTimers['setInterval'] = (func, delay) => loadWorkerTimers()
    .setInterval(func, delay);

export const setTimeout: TWorkerTimers['setTimeout'] = (func, delay) => loadWorkerTimers()
    .setTimeout(func, delay);
