import * as React from "react";

interface Props {
  editRecipe: EditRecipeProps[];
  handleEditRecipeChange: (name: string, value: any) => any;
  handleEditRecipe: (e: any) => any;
}

interface EditRecipeProps {
  _id: string;
  internal: boolean;
  name: string;
  price: number;
  __v: number;
}

interface State {
  editRecipe: any;
}

export default class EditRecipeForm extends React.Component<Props, State> {
  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    // if (nextProps.editRecipe[0]._id === prevState._id) {
    //   return null;
    // }
    console.log("nextProps", nextProps.editRecipe);
    return {
      editRecipe: nextProps.editRecipe
    };
  }

  constructor(props: any) {
    super(props);
    this.state = {
      editRecipe: {
        _id: "",
        price: 0,
        name: "",
        internal: false,
        __v: 0
      }
    };

    this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  // state: State = {

  // };

  public render() {
    // const { PropsEditRecipe } = this.props;
    // console.log("Edit!: ", this.props.editRecipe);
    return (
      <div>
        <br />
        <form onSubmit={this.handleOnSubmit}>
          <label>
            Name
            <input
              name="name"
              value={this.state.editRecipe.name}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Price
            <input
              name="price"
              value={
                this.state.editRecipe.price === 0
                  ? ""
                  : this.state.editRecipe.price
              }
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <label>
            Internal
            <input
              name="internal"
              type="checkbox"
              defaultChecked={this.state.editRecipe.internal}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <button type="submit"> Submit </button>
        </form>
      </div>
    );
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: any } = e.currentTarget;
    this.props.handleEditRecipeChange(name, value);
  };

  handleOnSubmit = (e: any) => {
    e.preventDefault();
    const editRecipeId = this.state.editRecipe._id;
    console.log("Form Submitted", editRecipeId);
    this.props.handleEditRecipe(e);
  };
}
