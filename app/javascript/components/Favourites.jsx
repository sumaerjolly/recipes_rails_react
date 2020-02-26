import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setFavourites } from '../actions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

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
    let yourFavourites = (
      <p className="text-center">
        You have no favourites currently please add some
        <br />
        <Link to="/recipes">Add Favourite Recipes</Link>
      </p>
    );
    if (favourites.length > 0) {
      yourFavourites = favourites.map((favourite, index) => (
        <Card className="text-center" key={index}>
          <Card.Header>Favourite {index + 1}</Card.Header>
          <Card.Body>
            <Card.Title>
              <Link to={`/recipe/${favourite.id}`}>{favourite.name}</Link>
            </Card.Title>
            <Card.Text></Card.Text>
            <Button
              className="btn btn-danger"
              variant="primary"
              id={favourite.id}
              onClick={this.removeFavourite}
            >
              Remove From Favourites
            </Button>
          </Card.Body>
        </Card>
      ));
    }
    return (
      <div>
        <h1 className="text-center orange">Favourite Recipes</h1>
        {yourFavourites}
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
