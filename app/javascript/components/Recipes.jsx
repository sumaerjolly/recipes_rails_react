import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setRecipes } from '../actions';

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
      <div key={index}>
        <div>
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            style={{ width: 300, height: 300 }}
          />
          <div>
            <h5>{recipe.name}</h5>
            <Link to={`/recipe/${recipe.id}`}>View Recipe</Link>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <h1>Recipes</h1>
        <div>{allRecipes}</div>
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
