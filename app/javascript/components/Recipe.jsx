import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setRecipeDetails, setFavourites } from '../actions';

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.addHtmlEntities = this.addHtmlEntities.bind(this);
    this.addToFavourites = this.addToFavourites.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
    this.favouritesButton = this.favouritesButton.bind(this);
    this.getIngredients = this.getIngredients.bind(this);
  }

  componentDidMount() {
    const { setRecipeDetails } = this.props;
    const {
      match: {
        params: { id },
      },
    } = this.props;

    axios
      .get(`/api/v1/recipes/${id}`)
      .then(response => {
        if (response.status === 200) {
          setRecipeDetails(response.data);
        }
      })
      .catch(() => this.props.history.push('/'));
    this.getFavourites();
  }

  addHtmlEntities(str) {
    return String(str)
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }

  addToFavourites() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios
      .post(' /api/v1/favourites', { id })
      .then(response => {
        console.log(response);
        this.props.history.push('/favourites');
      })
      .catch(error => {
        console.log('favourites errror', error);
      });
  }

  getFavourites() {
    const { setFavourites } = this.props;
    axios
      .get(' /api/v1/favourites')
      .then(response => {
        setFavourites(response.data);
      })
      .catch(error => {
        console.log('favourites error', error);
      });
  }

  favouritesButton() {
    let {
      match: {
        params: { id },
      },
    } = this.props;
    const { favourites } = this.props;
    const favouritesId = favourites.map(recipe => recipe.id);
    id = Number(id);

    return favouritesId.includes(id) ? (
      <button className="btn">
        <span aria-label="a rocket blasting off" role="img">
          ✅
        </span>
        Added To Favourites
      </button>
    ) : (
      <button className="btn-custom" onClick={this.addToFavourites}>
        Add To Favourites
      </button>
    );
  }

  getIngredients() {
    const { recipe } = this.props;
    let ingredientList = recipe.ingredients;
    console.log(ingredientList);
    console.log(typeof recipe.ingredients);
    if (ingredientList) {
      ingredientList = recipe.ingredients
        .split(',')
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
      return ingredientList;
    }
  }

  render() {
    const { recipe } = this.props;
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);
    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {this.getIngredients()}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-6">
              <h5 className="mb-3 mt-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipeInstruction}`,
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-3 mt-3">
              {this.favouritesButton()}
            </div>
          </div>
          <Link to="/recipes" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
  recipe: state.recipe,
  favourites: state.favourites,
});

const mapDispatchToProps = dispatch => ({
  setRecipeDetails: recipe => dispatch(setRecipeDetails(recipe)),
  setFavourites: favourites => dispatch(setFavourites(favourites)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Recipe);
