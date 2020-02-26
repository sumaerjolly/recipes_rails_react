import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setRecipes } from '../actions';
import Carousel from 'react-bootstrap/Carousel';

class Recipes extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { setRecipes } = this.props;
    axios
      .get('/api/v1/recipes')
      .then(response => {
        if (response.status === 200) {
          setRecipes(response.data);
        }
      })
      .catch(() => this.props.history.push('/'));
  }

  render() {
    const { recipes } = this.props;
    const allRecipes = recipes.map((recipe, index) => (
      <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={recipe.image}
          alt={`${recipe.name} image`}
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
  recipes: state.recipes
});

const mapDispatchToProps = dispatch => ({
  setRecipes: recipes => dispatch(setRecipes(recipes))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
