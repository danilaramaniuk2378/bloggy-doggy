import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextField } from 'material-ui';

class ReduxFormInput extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    placeholder: PropTypes.string,
  };

  static defaultProps = {
    placeholder: '',
  };

  render() {
    const {
      input,
      meta: { touched, error },
      placeholder,
    } = this.props;

    return (
      <TextField
        hintText={placeholder}
        errorText={touched ? error : ''}
        {...input}
      />
    );
  }
}

export default ReduxFormInput;
