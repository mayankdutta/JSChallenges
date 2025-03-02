import React, { useState, useCallback } from "react";

// A simple debounce function that delays the execution of 'func'
function debounce(func, delay, immediate=false) {
  let timer;

  return function () {
    let args = arguments;
    let context = this;

    clearTimeout(timer);
    timer = setTimeout(() => func.apply(context, args), delay);
  };
}

function DebouncedInput() {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  // We wrap the setDebouncedValue in debounce using useCallback to memoize it
  const updateDebouncedValue = useCallback(
    debounce((val) => {
      setDebouncedValue(val);
    }, 500),
    []
  );

  // Update the immediate value and call the debounced updater
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    updateDebouncedValue(newValue);
  };

  return (
    <div>
      <h2>Debouncing Example</h2>
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Type something..."
      />
      <p>
        <strong>Immediate Value:</strong> {value}
      </p>
      <p>
        <strong>Debounced Value (after 1 second delay):</strong>{" "}
        {debouncedValue}
      </p>
    </div>
  );
}

export default DebouncedInput;
