import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Slider from '~/common/components/slider/Slider';
import './style.less';

class FlatPreview extends Component {
  static propTypes = {
    flat: PropTypes.shape({
      photoUrls: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number,
      _id: PropTypes.string,
    }),
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  static defaultProps = {
    flat: {
      photoUrls: [],
      price: 0,
      _id: '',
    },
  };

  constructor(props) {
    super(props);

    this.state = {
      photoUrlIndex: 0,
    };
  }

  get img() {
    const { photoUrls } = this.props.flat;
    const { photoUrlIndex } = this.state;

    return (<img
      className="FlatPreview__img"
      alt="flat"
      src={photoUrls[photoUrlIndex]}
    />);
  }


  setPhotoUrlIndex = (index = 0) => {
    this.setState({
      photoUrlIndex: index,
    });
  }

  redirectToFlatDetails = () => {
    const { _id } = this.props.flat;
    this.props.history.push(`/flat-details/${_id}`);
  }

  render() {
    const { price, photoUrls } = this.props.flat;
    const { photoUrlIndex } = this.state;

    return (
      <div className="FlatPreview">
        <span onClick={this.redirectToFlatDetails}>{this.img}</span>
        <div>Text</div>
        <div>Text2</div>
        <div className="FlatPreview__priceLabel">$ {price}</div>
        <Slider
          photoUrls={photoUrls}
          setPhotoUrlIndex={this.setPhotoUrlIndex}
          photoUrlIndex={photoUrlIndex}
        />
      </div>
    );
  }
}

export default FlatPreview;
