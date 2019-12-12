import { TLoadWorkerTimersFunction } from './load-worker-timers-function';
import { TWorkerTimers } from './worker-timers';

export type TLoadWorkerTimersFactory = (load: (url: string) => TWorkerTimers, worker: string) => TLoadWorkerTimersFunction;
