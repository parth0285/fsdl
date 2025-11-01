// callback-demo.js
// A demonstration of callback concepts in Node.js

// Callbacks are functions passed as arguments to other functions
// that get executed after the completion of an asynchronous operation

// 1. Basic Callback Example
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback(); // Execute the callback function
}

// The callback function
function sayGoodbye() {
    console.log("Goodbye!");
}

// Using the greet function with a callback
greet("Alice", sayGoodbye);

// 2. Anonymous Callback
greet("Bob", function() {
    console.log("See you later!");
});

// 3. Arrow Function Callback (ES6)
greet("Charlie", () => {
    console.log("Have a nice day!");
});

// 4. Asynchronous Operation with Callback
function fetchData(callback) {
    console.log("Fetching data...");
    
    // Simulate an async operation with setTimeout
    setTimeout(() => {
        const data = { id: 1, name: "Sample Data" };
        callback(null, data); // Node.js convention: error first, then data
    }, 2000);
}

// Using the async function
fetchData((error, data) => {
    if (error) {
        console.error("Error:", error);
        return;
    }
    console.log("Data received:", data);
});

// 5. Callback Hell (Pyramid of Doom) - An anti-pattern
// This shows why promises/async-await are often preferred for complex async flows
function step1(callback) {
    setTimeout(() => {
        console.log("Step 1 completed");
        callback(null, "Step 1 result");
    }, 1000);
}

function step2(previousResult, callback) {
    setTimeout(() => {
        console.log("Step 2 completed with", previousResult);
        callback(null, "Step 2 result");
    }, 1000);
}

function step3(previousResult, callback) {
    setTimeout(() => {
        console.log("Step 3 completed with", previousResult);
        callback(null, "Final result");
    }, 1000);
}

// Nested callbacks - becomes hard to read and maintain
step1((error, result1) => {
    if (error) {
        console.error("Error in step1:", error);
        return;
    }
    
    step2(result1, (error, result2) => {
        if (error) {
            console.error("Error in step2:", error);
            return;
        }
        
        step3(result2, (error, finalResult) => {
            if (error) {
                console.error("Error in step3:", error);
                return;
            }
            
            console.log("Final result:", finalResult);
        });
    });
});

// 6. Error Handling in Callbacks
function mightFail(shouldFail, callback) {
    setTimeout(() => {
        if (shouldFail) {
            callback(new Error("Something went wrong!"));
        } else {
            callback(null, "Operation succeeded!");
        }
    }, 1000);
}

// Using with error handling
mightFail(false, (error, result) => {
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    console.log("Success:", result);
});

mightFail(true, (error, result) => {
    if (error) {
        console.error("Error:", error.message);
        return;
    }
    console.log("Success:", result);
});

console.log("All examples set up. Watch the async operations complete...");