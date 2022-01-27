import { useState } from "react";

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  const transition = function (newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory((prev) => [...prev, newMode]);
    } else {
      setHistory((prev) => [...prev.slice(0, prev.length - 1), newMode]);
    }
  };

  const back = function () {
    if (history.length < 2) return;
    setHistory((prev) => [...prev.slice(0, prev.length - 1)]);
    setMode(history[history.length - 2]);
  };

  return { mode, transition, back };
};

export default useVisualMode;
