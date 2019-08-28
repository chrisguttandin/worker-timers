import { load } from 'worker-timers-broker';
import { worker } from './worker/worker';

const blob: Blob = new Blob([ worker ], { type: 'application/javascript; charset=utf-8' });

const url: string = URL.createObjectURL(blob);

const workerTimers = load(url);

export const clearInterval = workerTimers.clearInterval;

export const clearTimeout = workerTimers.clearTimeout;

export const setInterval = workerTimers.setInterval;

export const setTimeout = workerTimers.setTimeout;

// Bug #1: Edge doesn't like the URL to be revoked directly.
setTimeout(() => URL.revokeObjectURL(url), 0);
