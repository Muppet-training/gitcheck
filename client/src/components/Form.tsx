import * as React from "react";

interface Props {
  age?: number;
  text: string;
  handleAddNewRecipe: (newRecipe: any) => void;
}

interface State {
  price: number;
  name: string;
}

export default class Form extends React.Component<Props, State> {
  state: State = {
    price: 0,
    name: ""
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    this.setState({
      [name]: value
    } as any);
  };

  handleOnSubmit = (e: any) => {
    e.preventDefault();
    const newRecipe = this.state;
    console.log("Form Submitted", newRecipe);
    this.props.handleAddNewRecipe(newRecipe);
  };

  public render() {
    const { text } = this.props;
    const { name, price } = this.state;
    return (
      <div>
        <div>{text}</div>
        <form onSubmit={this.handleOnSubmit}>
          <label>
            Name
            <input name="name" value={name} onChange={this.handleChange} />
          </label>
          <label>
            Price
            <input
              name="price"
              value={price === 0 ? "" : price}
              onChange={this.handleChange}
            />
          </label>
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}
