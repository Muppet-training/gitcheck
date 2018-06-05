import * as React from "react";

export interface MyCompProps {
  name: string;
  handlePassedOnClick: any;
}

function handleOnClick() {
  alert("You Clicked Me");
}

const MyComp = (props: MyCompProps) => {
  return (
    <div>
      <h3 onClick={handleOnClick}>{props.name}</h3>
      <h3 onClick={props.handlePassedOnClick}>
        Passed through function {props.name}
      </h3>
    </div>
  );
};

export default MyComp;
