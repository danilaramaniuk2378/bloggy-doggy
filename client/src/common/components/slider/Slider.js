import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.less';

class Slider extends Component {
  static propTypes = {
    photoUrlIndex: PropTypes.number.isRequired,
    setPhotoUrlIndex: PropTypes.func.isRequired,
    photoUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    maxSlidesCount: PropTypes.number,
  };

  static defaultProps = {
    maxSlidesCount: 4,
  };

  render() {
    const {
      photoUrls,
      setPhotoUrlIndex,
      photoUrlIndex,
      maxSlidesCount,
    } = this.props;
    const quantity = photoUrls.length < maxSlidesCount
      ? photoUrls.length
      : maxSlidesCount;
    const sliderClassName = index => classNames(
      'Slider__item',
      { 'Slider__item--active': photoUrlIndex === index },
    );

    return (
      <div className="Slider">
        {
          photoUrls.slice(0, quantity).map((item, index) => (<div
            className={sliderClassName(index)}
            key={item}
            onClick={() => setPhotoUrlIndex(index)}
          />))
        }
      </div>
    );
  }
}

export default Slider;
