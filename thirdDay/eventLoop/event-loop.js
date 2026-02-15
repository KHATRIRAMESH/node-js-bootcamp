// day-3-demo/event-loop.js
console.log("1. Start");

setTimeout(() => console.log("2. setTimeout 0ms"), 1);

(async function asyncFunc() {
    console.log("5. Inside async function");
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    try {
        const response = await fetch(url);
        console.log("3. Response fetched");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        } else {
            console.log("Response fetched successfully");
        }
        const result = await response.json();
        console.log(result)
    } catch (error) {
        console.error(error.message);
    }
}())


console.log("4. End");
