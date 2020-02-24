import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setRecipeDetails } from '../actions';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
  }

  componentDidMount() {
    const { setRecipeDetails } = this.props;
    const {
      match: {
        params: { id }
      }
    } = this.props;

    axios
      .get(`/api/v1/recipes/${id}`)
      .then(response => {
        if (response.status === 200) {
          setRecipeDetails(response.data);
        }
      })
      .catch(() => this.props.history.push('/'));
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  addToFavourites() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    axios
      .post(' /api/v1/favourites', { id: id })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('favourites errror', error);
      });
  }

  render() {
    const { recipe } = this.props;
    const ingredientList = recipe.ingredients;
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);
    return (
      <div>
        <img
          src={recipe.image}
          alt={`${recipe.name} image`}
          style={{ width: 300, height: 300 }}
        />
        <h1> {recipe.name}</h1>
        <ul>
          <h5>Ingredient List</h5>
          {ingredientList}
        </ul>
        <div>
          <h5>Preparation Instructions</h5>
          <div
            dangerouslySetInnerHTML={{
              __html: `${recipeInstruction}`
            }}
          />
          <button onClick={this.addToFavourites}>Add To Favourites</button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  recipe: state.recipe
});

const mapDispatchToProps = dispatch => ({
  setRecipeDetails: recipe => dispatch(setRecipeDetails(recipe))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipe);
