import * as React from "react";
import Styled from "styled-components";
import { Recipe } from "src/App";

const ListLi = Styled.li`
    display: grid;
    grid-gap: 10px;
    grid-template-columns: [col] 200px [col] 100px [col] 100px [col] 100px ;
    grid-template-rows: [row] 40px ;
    list-style-type: none;
    text-align: left;
`;

const ListItem = Styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  list-style-type: none;
`;

const DeleteButton = Styled.button`
  background-color: red;
  color: #fff;
  border: none;
  outline: 0;
  cursor: pointer;
`;

export interface Props {
  // _id: string;
  // internal?: boolean;
  // name: string;
  // price: number;
  recipes: Recipe[];
  handleDelete: (id: string) => any;
  handleLoadEditFormOnClick: (id: string) => any;
}

class ListRecipes extends React.Component<Props> {
  render() {
    // console.log(this.props.name);
    const recipes = this.props.recipes.map((recipe: any, index: number) => {
      return (
        <ListLi key={index}>
          <ListItem
            onClick={this.props.handleLoadEditFormOnClick.bind(
              this,
              recipe._id
            )}
          >
            {recipe.name}
          </ListItem>
          <ListItem>{recipe.price}</ListItem>
          <ListItem>{recipe.internal ? "True" : "False"}</ListItem>
          <ListItem>
            <DeleteButton
              onClick={this.props.handleDelete.bind(this, recipe._id)}
            >
              x
            </DeleteButton>
          </ListItem>
        </ListLi>
      );
    });
    return recipes;
  }
}

export default ListRecipes;
