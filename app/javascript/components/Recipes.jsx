import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { setRecipes } from '../actions';

class Recipes extends Component {
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
    return (
      <div>
        <h1>Is this working?</h1>
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
