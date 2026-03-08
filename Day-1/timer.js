import { setTimeout } from "timers";

setTimeout(() => {

    console.log("Hello, World!");
}, 1000);

let counter = 0;
const interval = setInterval(() => {
    counter++;
    console.log(`Interval tick ${counter}`);
    if (counter >= 3) clearInterval(interval);
}, 1000);

// Execute in the next event loop iteration
setImmediate(() => {
    console.log('This runs in the next iteration of the event loop');
});

console.log('Timers scheduled'); 