import { useCallback } from "react";

function throttle(func, interval) {
  let lastExecuted = -1;
  let timer;

  return function () {
    const context = this;
    const args = arguments;

    let now = Date.now();
    if (lastExecuted === -1) {
      func.apply(context, args);
      lastExecuted = now;
    } else if (now - lastExecuted >= interval) {
      lastExecuted = now;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(context, args), interval);
    }
  };
}

const ThrottleTest = () => {
  // Normal click handler (triggers on every click)
  const handleClick = () => {
    console.log("Button clicked:", new Date().toLocaleTimeString());
  };

  // Throttled click handler (executes at most every 2 seconds)
  const throttledClick = useCallback(
    throttle(() => {
      console.log("Throttled Click:", new Date().toLocaleTimeString());
    }, 2000),
    []
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Throttling Demo</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Normal Click (Logs Every Time)
      </button>
      <button
        onClick={throttledClick}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Throttled Click (Logs Once Every 2s)
      </button>
    </div>
  );
};

export default ThrottleTest;
