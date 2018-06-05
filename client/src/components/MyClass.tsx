import * as React from "react";

export interface MyClassProps {
  name?: string;
  isTrue: boolean;
}
export interface MyClassState {
  age: number;
}

class MyClass extends React.Component<MyClassProps, MyClassState> {
  public static defaultProps: Partial<MyClassProps> = {
    name: "Tom"
  };

  public state = {
    age: 27
  };

  public render() {
    return (
      <div>
        <h1>
          My name is {this.props.name} and I am {this.state.age} years old{" "}
        </h1>
      </div>
    );
  }
}

export default MyClass;
