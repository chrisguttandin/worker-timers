import { worker } from './worker/worker';
import { load } from 'worker-timers-broker';

const blob: Blob = new Blob([ worker ], { type: 'application/javascript' });

const url: string = URL.createObjectURL(blob);

const { clearInterval, clearTimeout, setInterval, setTimeout } = load(url);

export { clearInterval, clearTimeout, setInterval, setTimeout };
