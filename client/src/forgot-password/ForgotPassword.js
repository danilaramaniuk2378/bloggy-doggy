import React, { Component } from 'react';
import classNames from 'classnames';
import Validator from 'validator';
import { RaisedButton, TextField } from 'material-ui';

import RecoveryPasswordModel from '~/common/models/lokka/RecoveryPasswordModel';
import Alert from '~/common/components/alerts/Alert';

import './style.less';

class ForgotPassword extends Component {
  state = {
    data: {
      email: '',
    },
    loading: false,
    errors: {
      email: '',
      server: '',
    },
    isSent: false,
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = async () => {
    const errors = this.validate(this.state.data);
    this.setState({
      errors,
      isSent: false,
    });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      try {
        await RecoveryPasswordModel.sendForgotEmail(this.state.data);
        this.setState({
          loading: false,
          isSent: true,
        });
      } catch (err) {
        this.setState({
          errors: {
            ...errors,
            server: err.message,
          },
          loading: false,
        });
      }
    }
  };

  validate = (data) => {
    const errors = {};
    if (!Validator.isEmail(data.email)) errors.email = 'Invalid email';
    return errors;
  };

  render() {
    const {
      loading,
      errors,
      data,
      isSent,
    } = this.state;
    const forgotPasswordClass = classNames('ForgotPassword', {
      ForgotPassword__block: loading,
    });

    return (
      <div className={forgotPasswordClass}>
        <h1>Восстановить пароль</h1>
        { errors.server && <Alert type="error" text={errors.server} /> }
        { isSent && <Alert type="success" text="Check your email" /> }
        <div>
          <TextField
            type="email"
            id="email"
            name="email"
            errorText={errors.email}
            hintText="Введите email"
            value={data.email}
            onChange={this.onChange}
          /><br />
          <RaisedButton onClick={this.onSubmit} label="ВОССТАНОВИТЬ ПАРОЛЬ" />
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
