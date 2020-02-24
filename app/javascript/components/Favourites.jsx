import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setFavourites } from '../actions';

class Favourites extends Component {
  constructor(props) {
    super(props);
    this.removeFavourite = this.removeFavourite.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
  }
  componentDidMount() {
    this.getFavourites();
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

  removeFavourite(e) {
    const id = e.target.id;
    axios
      .delete(`/api/v1/favourites/${id}`)
      .then(response => {
        this.getFavourites();
      })
      .catch(error => {
        console.log('delete errors', error);
      });
  }
  render() {
    const { favourites } = this.props;
    const yourFavourites = favourites.map((favourite, index) => (
      <div key={index}>
        <div>
          <img
            src={favourite.image}
            alt={`${favourite.name} image`}
            style={{ width: 300, height: 300 }}
          />
          <div>
            <h5>{favourite.name}</h5>
            <Link to={`/recipe/${favourite.id}`}>View Recipe</Link>
            <button id={favourite.id} onClick={this.removeFavourite}>
              Remove from favourites
            </button>
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <h1>Favourite Recipes</h1>
        <div>{yourFavourites}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  favourites: state.favourites
});

const mapDispatchToProps = dispatch => ({
  setFavourites: favourites => dispatch(setFavourites(favourites))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favourites);
