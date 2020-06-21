import { TLoadWorkerTimersFactory, TWorkerTimers } from '../types';

let workerTimers: null | TWorkerTimers = null;

export const createLoadWorkerTimers: TLoadWorkerTimersFactory = (load, worker) => {
    return () => {
        if (workerTimers !== null) {
            return workerTimers;
        }

        const blob = new Blob([worker], { type: 'application/javascript; charset=utf-8' });
        const url = URL.createObjectURL(blob);

        workerTimers = load(url);

        // Bug #1: Edge doesn't like the URL to be revoked directly.
        workerTimers.setTimeout(() => URL.revokeObjectURL(url), 0);

        return workerTimers;
    };
};
