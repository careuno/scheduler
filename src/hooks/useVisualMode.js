import { useState } from "react";

// const useVisualMode = (initial) => {
//   const [history, setHistory] = useState([initial]);
//   const [mode, setMode] = useState(initial);
// //[1]

// const transition = function(newMode, replace = false) {

//   // apply this pattern setHistory(prev => ([...prev, newMode]))

//   let newHistory = [...history]

//  if (!replace) {
//     newHistory = [...history, newMode];
//     setHistory(newHistory);
//     //setHistory(prev => ([...prev,newMode]));
//     setMode(newMode);
//     return;

//  } else {
//     //const backHistory = [...newHistory]//redundant
//     newHistory.pop();
//     const newBackHistory = [...newHistory, newMode];
//     setHistory(newBackHistory);
//    // setHistory(prev => ([...prev,newMode]));
//     setMode(newMode);
//  }
// }

// const back = function() {

//     const newHistory = [...history];
//     if (newHistory.length > 1) {
//     newHistory.pop();
//     const backIndex = newHistory.length - 1;
//     setMode(newHistory[backIndex]);
//     setHistory(newHistory);
//   }
//   return
//  }

// return {mode, transition, back, history};
// };

// export default useVisualMode;

//if you want to look into slice
// function back() {
//   if (history.length < 2) return;
//   setHistory(prev => [...prev.slice(0, history.length - 1)]);
// }

//--------------------SLICE OPTION WITH PREV----------------------------
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
