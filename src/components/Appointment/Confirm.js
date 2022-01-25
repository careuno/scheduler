import React from "react";
import Button from "../Button";

export default function Confirm(props) {
  const {message, onConfirm, onCancel, student, interviewer} = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{message}</h1>
      <section className="appointment__actions">
        <Button danger onClick={onCancel} >Cancel</Button>
        <Button danger onClick={onConfirm}>Confirm</Button>
        {/* <Button danger onClick={(e)=> onConfirm(a,b)}>Confirm</Button> */}
      </section>
    </main>
  );
};

