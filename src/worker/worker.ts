// This is the minified and stringified code of the worker-timers-worker package.
export const worker = `(()=>{var e={455:function(e,t){!function(e){"use strict";var t=function(e){return function(t){var r=e(t);return t.add(r),r}},r=function(e){return function(t,r){return e.set(t,r),r}},n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,o=536870912,s=2*o,a=function(e,t){return function(r){var a=t.get(r),i=void 0===a?r.size:a<s?a+1:0;if(!r.has(i))return e(r,i);if(r.size<o){for(;r.has(i);)i=Math.floor(Math.random()*s);return e(r,i)}if(r.size>n)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;r.has(i);)i=Math.floor(Math.random()*n);return e(r,i)}},i=new WeakMap,u=r(i),c=a(u,i),d=t(c);e.addUniqueNumber=d,e.generateUniqueNumber=c}(t)}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={exports:{}};return e[n].call(s.exports,s,s.exports,r),s.exports}(()=>{"use strict";const e=-32603,t=-32602,n=-32601,o=(e,t)=>Object.assign(new Error(e),{status:t}),s=t=>o('The handler of the method called "'.concat(t,'" returned an unexpected result.'),e),a=(t,r)=>async({data:{id:a,method:i,params:u}})=>{const c=r[i];try{if(void 0===c)throw(e=>o('The requested method called "'.concat(e,'" is not supported.'),n))(i);const r=void 0===u?c():c(u);if(void 0===r)throw(t=>o('The handler of the method called "'.concat(t,'" returned no required result.'),e))(i);const d=r instanceof Promise?await r:r;if(null===a){if(void 0!==d.result)throw s(i)}else{if(void 0===d.result)throw s(i);const{result:e,transferables:r=[]}=d;t.postMessage({id:a,result:e},r)}}catch(e){const{message:r,status:n=-32603}=e;t.postMessage({error:{code:n,message:r},id:a})}};var i=r(455);const u=new Map,c=(e,r,n)=>({...r,connect:({port:t})=>{t.start();const n=e(t,r),o=(0,i.generateUniqueNumber)(u);return u.set(o,(()=>{n(),t.close(),u.delete(o)})),{result:o}},disconnect:({portId:e})=>{const r=u.get(e);if(void 0===r)throw(e=>o('The specified parameter called "portId" with the given value "'.concat(e,'" does not identify a port connected to this worker.'),t))(e);return r(),{result:null}},isSupported:async()=>{if(await new Promise((e=>{const t=new ArrayBuffer(0),{port1:r,port2:n}=new MessageChannel;r.onmessage=({data:t})=>e(null!==t),n.postMessage(t,[t])}))){const e=n();return{result:e instanceof Promise?await e:e}}return{result:!1}}}),d=(e,t,r=()=>!0)=>{const n=c(d,t,r),o=a(e,n);return e.addEventListener("message",o),()=>e.removeEventListener("message",o)},l=e=>t=>{const r=e.get(t);if(void 0===r)return Promise.resolve(!1);const[n,o]=r;return clearTimeout(n),e.delete(t),o(!1),Promise.resolve(!0)},f=(e,t,r)=>(n,o,s)=>{const{expected:a,remainingDelay:i}=e(n,o);return new Promise((e=>{t.set(s,[setTimeout(r,i,a,t,e,s),e])}))},m=(e,t)=>{const r=performance.now(),n=e+t-r-performance.timeOrigin;return{expected:r+n,remainingDelay:n}},p=(e,t,r,n)=>{const o=e-performance.now();o>0?t.set(n,[setTimeout(p,o,e,t,r,n),r]):(t.delete(n),r(!0))},h=new Map,v=l(h),w=new Map,g=l(w),M=f(m,h,p),y=f(m,w,p);d(self,{clear:async({timerId:e,timerType:t})=>({result:await("interval"===t?v(e):g(e))}),set:async({delay:e,now:t,timerId:r,timerType:n})=>({result:await("interval"===n?M:y)(e,t,r)})})})()})();`; // tslint:disable-line:max-line-length
