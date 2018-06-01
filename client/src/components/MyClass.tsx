import * as React from 'react';

export interface IMyClassProps { name?: string; isTrue: boolean; }
export interface IMyClassState { age: number; }

class MyClass extends React.Component<IMyClassProps, IMyClassState> {

  public static defaultProps: Partial<IMyClassProps> = {
    name: 'Tom'
  };

  public state = {
    age: 27
  }

  public render() {
    return (
      <div>
        <h1>My name is {this.props.name} and I am {this.state.age} years old </h1>
      </div>
    );
  }
}

export default MyClass; 
