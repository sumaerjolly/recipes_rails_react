import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
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
        console.log(response.data)
        setFavourites(response.data);
      })
      .catch(error => {
        console.log("error in getting favourites",error)
      })
  }

  removeFavourite(e) {
    const { id } = e.target;
    axios
      .delete(`/api/v1/favourites/${id}`)
      .then(() => {
        this.getFavourites();
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
      /* eslint-disable */
      yourFavourites = favourites.map((favourite, index) => (
        /* eslint-disable */
        <Card className="text-center" key={index}>
          <Card.Img
            variant="top"
            src={favourite.image}
            alt={`${favourite.name} image`}
            style={{ height: 250 }}
          />
          <Card.Body>
            <Card.Title>
              <Link to={`/recipe/${favourite.id}`}>{favourite.name}</Link>
            </Card.Title>
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
        <section className="jumbotron jumbotron-fluid text-center favourites">
          <div className="container py-5">
            <h1 className="display-4">
              {this.props.user.user.username}
              {' '}
              favourites
            </h1>
          </div>
        </section>
        <CardColumns>{yourFavourites}</CardColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  favourites: state.favourites,
});

const mapDispatchToProps = dispatch => ({
  setFavourites: favourites => dispatch(setFavourites(favourites)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Favourites);
