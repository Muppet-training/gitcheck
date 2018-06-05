import * as React from "react";
import Styled from "styled-components";
import Form from "./components/Form";
import MyClass from "./components/MyClass";
import MyComp from "./components/MyComp";
import ListRecipes from "./components/ListRecipes";

export interface State {
  recipes: Recipe[];
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
      recipes: [
        {
          internal: false,
          _id: "5b0d610a50ec2d0a6087d901",
          price: 23,
          name: "Cakes",
          __v: 0
        },
        {
          internal: true,
          _id: "5b11434175ecff12789bb24a",
          name: "Carl's Green Goo",
          price: 14,
          __v: 0
        },
        {
          internal: false,
          _id: "5b11454ccc6511270c8486c3",
          name: "Carl's Cake",
          price: 95,
          __v: 0
        }
      ]
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
        // this.setState({
        //   recipes: json
        // });
        this.setState((prevState, props) => ({
          ...prevState.recipes,
          recipes: json
        }));
      });
  }

  public render() {
    return (
      <AppWrap>
        <MyClass isTrue={true} />
        <MyComp
          name="My Clickable"
          handlePassedOnClick={this.handlePassedOnClick}
        />
        <hr />
        <Form text="My Form" handleAddNewRecipe={this.handleAddNewRecipe} />
        <hr />
        <ListRecipes
          recipes={this.state.recipes}
          handleDelete={this.handleDelete}
        />
        <br />
        {/* <button onClick={this.handleGetAllRecipes}> + More Recipes</button> */}
      </AppWrap>
    );
  }

  handlePassedOnClick() {
    alert("You passed a function using typescript!");
  }

  handleGetAllRecipes = () => {
    fetch("/api/recipes")
      .then(data => {
        console.log(data);
        return data.json();
      })
      .then(json => {
        // this.setState({
        //   recipes: json
        // });
        this.setState((prevState, props) => ({
          ...prevState.recipes,
          recipes: json
        }));
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
    console.log(Response);

    if (Response.status >= 200 && Response.status < 300) {
      return Response;
    } else {
      const error = new Error(Response.statusText);
      console.log("hI Ya error", error);
      // error.response = Response;
      throw error;
    }
  };

  handleDelete = (id: number) => {
    console.log("You Clicked", id);
    fetch("/api/recipes/" + id, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      // .then(this.checkStatus)
      .then(() => console.log("updated!!!"))
      // .then(this.handleCheckEditDeleteId(id))
      .then(() => this.handleGetAllRecipes());
  };
}

const AppWrap = Styled.div`
  margin: 40px;
`;

export default App;
