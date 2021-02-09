import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatModel from '~/common/models/lokka/FlatModel';
import './style.less';

class FlatDetails extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        id: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      flat: {
        photoUrls: [],
      },
    };
  }

  componentDidMount = async () => {
    const { getFlat } = await FlatModel.getFlatById(this.props.match.params.id);
    this.setState({ flat: getFlat });
  }

  redirectOnMainPage = () => this.props.history.push('/');

  render() {
    const { photoUrls } = this.state.flat;

    return (
      <div className="FlatDetails">
        <div
          className="FlatDetails__post-header"
        >
          <span
            className="FlatDetails__post-header__catalog"
            onClick={this.redirectOnMainPage}
          >
            Каталог квартир
          </span>
          <span className="FlatDetails__post-header__description">Some short description</span>
        </div>
        <div
          className="FlatDetails__main-img"
          style={{ backgroundImage: `url(${photoUrls[0]})` }}
        />
      </div>
    );
  }
}

export default FlatDetails;
