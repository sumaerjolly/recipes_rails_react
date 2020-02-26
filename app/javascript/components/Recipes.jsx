import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { setRecipes } from '../actions';

class Recipes extends Component {
  componentDidMount() {
    const { setRecipes, history } = this.props;
    axios
      .get('/api/v1/recipes')
      .then(response => {
        if (response.status === 200) {
          setRecipes(response.data);
        }
      })
      .catch(() => history.push('/'));
  }

  render() {
    const { recipes } = this.props;
    const allRecipes = recipes.map(recipe => (
      <Carousel.Item key={recipe.id}>
        <img
          className="d-block w-100"
          src={recipe.image}
          alt={`${recipe.name}`}
        />
        <Carousel.Caption>
          <h3>{recipe.name}</h3>
          <Link className="btn-custom" to={`/recipe/${recipe.id}`}>
            View Recipe
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    ));
    return (
      <div>
        <h1 className="text-center">Recipes</h1>
        <Carousel className="testing">{allRecipes}</Carousel>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  recipes: state.recipes,
});

const mapDispatchToProps = dispatch => ({
  setRecipes: recipes => dispatch(setRecipes(recipes)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recipes);
