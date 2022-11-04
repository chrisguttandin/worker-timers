import { load } from 'worker-timers-broker';
import { createLoadOrReturnBroker } from './factories/load-or-return-broker';
import { worker } from './worker/worker';

const loadOrReturnBroker = createLoadOrReturnBroker(load, worker);

export const clearInterval: ReturnType<typeof load>['clearInterval'] = (timerId) => loadOrReturnBroker().clearInterval(timerId);

export const clearTimeout: ReturnType<typeof load>['clearTimeout'] = (timerId) => loadOrReturnBroker().clearTimeout(timerId);

export const setInterval: ReturnType<typeof load>['setInterval'] = (func, delay) => loadOrReturnBroker().setInterval(func, delay);

export const setTimeout: ReturnType<typeof load>['setTimeout'] = (func, delay) => loadOrReturnBroker().setTimeout(func, delay);
