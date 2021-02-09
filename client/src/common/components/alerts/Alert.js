import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './style.less';

const SUCCESS = 'success';
const ERROR = 'error';

class Alert extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: '',
  };

  render() {
    const {
      text,
      type,
    } = this.props;

    const alertClass = classNames('Alert', {
      'Alert--error': type === ERROR,
      'Alert--success': type === SUCCESS,
    });

    return (
      <div className={alertClass}>{text}</div>
    );
  }
}

export default Alert;
