import * as React from "react";
import Styled from "styled-components";
import Form from "./components/Form";
import MyClass from "./components/MyClass";
import MyComp from "./components/MyComp";
import ListRecipes from "./components/ListRecipes";
import EditRecipeForm from "./components/EditRecipeForm";

export interface State {
  recipes: Recipe[];
  editRecipe?: any | null;
}

export interface Recipe {
  _id: string;
  internal: boolean;
  name: string;
  price: number;
  __v: number;
}

class App extends React.Component<any, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      recipes: [],
      editRecipe: {
        _id: "",
        internal: false,
        name: "",
        price: 0,
        __v: 0
      }
    };
    this.handleGetAllRecipes = this.handleGetAllRecipes.bind(this);
  }

  componentDidMount() {
    fetch("/api/recipes")
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(json => {
        this.setState({
          recipes: json
        });
      });
  }

  public render() {
    // if (this.state.editRecipe._id !== "") {
    //   console.log("editRecipe", this.state.editRecipe);
    // }
    console.log("after editRecipe", this.state.editRecipe);
    return (
      <AppWrap>
        <MyClass />
        <MyComp
          name="My Clickable"
          handlePassedOnClick={this.handlePassedOnClick}
        />
        <hr />
        <Form handleAddNewRecipe={this.handleAddNewRecipe} />
        <hr />
        <ListRecipes
          recipes={this.state.recipes}
          handleDelete={this.handleDelete}
          handleLoadEditFormOnClick={this.handleLoadEditFormOnClick}
        />
        <hr />
        {this.state.editRecipe._id !== "" ? (
          <div>
            <div>Edit Recipe</div>
            <EditRecipeForm
              editRecipe={this.state.editRecipe}
              handleEditRecipeChange={this.handleEditRecipeChange}
              handleEditRecipe={this.handleEditRecipe}
            />
          </div>
        ) : (
          <div>Click Recipe To Edit It</div>
        )}
      </AppWrap>
    );
  }

  handlePassedOnClick() {
    alert("You passed a function using typescript!");
  }

  handleLoadEditFormOnClick = (recipeId: string) => {
    const editRecipe = this.state.recipes.filter(
      recipe => recipe._id === recipeId
    );
    console.log("selected editRecipe", editRecipe[0]);
    this.setState({ editRecipe: editRecipe[0] });
  };

  handleEditRecipeChange = (name: string, value: any) => {
    console.log("Passed Edit value", this.state);
    let inputValue = value;
    if (name === "internal") {
      this.state.editRecipe.internal === false
        ? (inputValue = true)
        : (inputValue = false);
    }
    this.setState((prevState, props) => ({
      editRecipe: {
        ...prevState.editRecipe,
        [name]: inputValue
      }
    }));
  };

  handleEditRecipe = (e: any) => {
    e.preventDefault();
    const editRecipe = this.state.editRecipe;

    return fetch("/api/recipes/" + editRecipe._id, {
      method: "put",
      body: JSON.stringify(editRecipe),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(this.checkStatus)
      .then(() => this.clearEditRecipe())
      .then(() => this.handleGetAllRecipes());
  };

  clearEditRecipe = () => {
    const refreshRecipe = {
      _id: "",
      internal: false,
      name: "",
      price: 0,
      __v: 0
    };
    this.setState({ editRecipe: refreshRecipe });
  };

  handleGetAllRecipes = () => {
    fetch("/api/recipes")
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(json => {
        this.setState({
          recipes: json
        });
      });
  };

  handleAddNewRecipe = (newRecipe: any) => {
    return fetch("/api/recipes", {
      method: "post",
      body: JSON.stringify(newRecipe),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        console.log("THIS Response: ", res);
        this.checkStatus(res);
      })
      .then(() => console.log("THIS: ", this))
      .then(() => this.handleGetAllRecipes());
  };

  checkStatus = (Response: any) => {
    if (Response.status >= 200 && Response.status < 300) {
      return Response;
    } else {
      const error = new Error(Response.statusText);
      throw error;
    }
  };

  handleDelete = (id: string) => {
    // console.log("You Clicked", id);
    fetch("/api/recipes/" + id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(() => this.handleGetAllRecipes());
  };
}

const AppWrap = Styled.div`
  margin: 40px;
`;

export default App;
