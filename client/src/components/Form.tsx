import * as React from 'react';

interface IProps {
  age?: number;
  text: string;

}

interface Istate {
  email: string;
  name: string;

}

export default class Form extends React.Component<IProps, Istate> {

  state: Istate = {
    email: "",
    name: "",

  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    this.setState({
      [name]: value
    } as any)
  }

  public render() {
    const { text } = this.props
    const { name } = this.state;
    return (
      <div>
        <div>{text}</div>
        <input name="name" value={name} onChange={this.handleChange} />
      </div>
    );
  }
}
;