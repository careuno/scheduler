import React from "react";
//imports the classnames function to better handle conditional classes in an array
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {
   const buttonClass = classNames("button", {
     "button--confirm": props.confirm,
     "button--danger": props.danger
   });
 
   return (
     <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
     >
       {props.children}
     </button>
   );
 }

//--------------------------------- BEFORE REFACTORING --------------------------------------//
// import React from "react";
// import "components/Button.scss";

// export default function Button(props) {
// //this applies default styling for the "button class"
//    let buttonClass = "button";
// //these add a class depending on the prop
// const { confirm, danger, disabled, onClick } = props
//    if (confirm) {
//       buttonClass += " button--confirm";
//    }
//    if (danger) {
//       buttonClass += " button--danger";
//    }
//    // You don't do this because you are setting the disabled ATTRIBUTE not a 'disabled' class, notice in COMPASS how it's a different color from class and NOT inside the class="" quotes when translated to HTML, disabled is just a boolean attribute that is explicitly true when stated, and removed entirely when false
//    // if (disabled) {
//    //    buttonClass += " disabled";
//    // }
//   console.log('props ---->',props)
//    return (
//       <button 
//          className={buttonClass} 
//          onClick={onClick}
//          disabled={disabled}
//       >
//          {props.children}
//       </button>
//    );
// }
