import {useState} from 'react';

const useVisualMode = (initial) => {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);
//[1]

const transition = function(newMode, replace = false) {
 
  let newHistory = [...history]
 if (!replace) {
    newHistory = [...history, newMode];
    setHistory(newHistory);
    setMode(newMode)
    return;
 } else {
    const backHistory = [...newHistory]
    backHistory.pop();
    const newBackHistory = [...backHistory, newMode]
    setHistory(newBackHistory);
    setMode(newMode)
 }
}
//newHistory =[1, 2]
//setHistory=[1,2]
//mode = 2

//newHistory =[1, 2, 3]
//setHistory=[1,2, 3]
//mode = 3

const back = function() {

    const newHistory = [...history]
    if (newHistory.length > 1) { 
    newHistory.pop()
    const backIndex = newHistory.length - 1
    setMode(newHistory[backIndex])
    setHistory(newHistory)
  } 
  return
 }
 


return {mode, transition, back, history};

  
};

export default useVisualMode;


//transition, back, history


//  const newHistory = [...history];
//  newHistory.push(newMode);
//  setHistory(newHistory);  

  // const back = function() {
  //   const newHistory = [...history];
  //   newHistory.pop()
  //   setHistory(newHistory);
  // }