import * as React from "react";

interface Props {
  handleAddNewRecipe: (newRecipe: any) => void;
}

interface State {
  price: number;
  name: string;
  internal: boolean;
}

export default class Form extends React.Component<Props, State> {
  state: State = {
    price: 0,
    name: "",
    internal: false
  };

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.currentTarget;
    this.setState({
      [name]: value
    } as any);
  };

  handleCheckboxChange = () => {
    const prevState = this.state;
    let checked = false;
    prevState.internal === false ? (checked = true) : (checked = false);
    this.setState({ internal: checked });
  };

  handleOnSubmit = (e: any) => {
    e.preventDefault();
    const newRecipe = this.state;
    console.log("Form Submitted", newRecipe);
    this.props.handleAddNewRecipe(newRecipe);
    this.setState({
      name: "",
      price: 0,
      internal: false
    });
  };

  public render() {
    const { name, price, internal } = this.state;
    return (
      <div>
        <div>+ Add Recipe</div>
        <br />
        <form onSubmit={this.handleOnSubmit}>
          <label>
            Name
            <input name="name" value={name} onChange={this.handleChange} />
          </label>
          <br />
          <br />
          <label>
            Price
            <input
              name="price"
              value={price === 0 ? "" : price}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Interval
            <input
              name="interval"
              type="checkbox"
              defaultChecked={internal}
              onChange={this.handleCheckboxChange}
            />
          </label>
          <br />
          <br />
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }
}
