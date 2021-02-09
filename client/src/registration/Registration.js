import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { RaisedButton, TextField } from 'material-ui';

import { login } from '~/actions/auth';
import AuthModel from '~/common/models/axios/AuthModel';
import Alert from '~/common/components/alerts/Alert';

import './style.less';

class Registration extends React.Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    data: {
      email: '',
      password: '',
      username: '',
      resetPassword: '',
    },
    loading: false,
    errors: {
      username: '',
      email: '',
      password: '',
      resetPassword: '',
      server: '',
    },
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value },
    });

  onSubmit = async () => {
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      try {
        const { data } = await AuthModel.registration(this.state.data);
        this.props.login(data.token, data.refreshToken);
        this.props.history.push('/');
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
    if (!data.username) errors.username = 'Can\'t be blank';
    if (!data.password) errors.password = 'Can\'t be blank';
    if (data.password !== data.resetPassword) errors.resetPassword = 'Пароли должны совпадать';

    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const registrationClass = classNames('Registration', {
      Registration__block: loading,
    });

    return (
      <div className={registrationClass}>
        <h1>Добро пожаловать!</h1>
        { errors.server && <Alert type="error" text={errors.server} /> }
        <div>
          <TextField
            type="username"
            id="username"
            name="username"
            hintText="Введите Ваше имя"
            errorText={errors.username}
            value={data.username}
            onChange={this.onChange}
          /><br />
          <TextField
            type="email"
            id="email"
            name="email"
            hintText="Введите email"
            value={data.email}
            errorText={errors.email}
            onChange={this.onChange}
          /><br />
          <TextField
            type="password"
            id="password"
            name="password"
            hintText="Введите пароль"
            value={data.password}
            errorText={errors.password}
            onChange={this.onChange}
          /><br />
          <TextField
            type="password"
            id="resetPassword"
            name="resetPassword"
            hintText="Введите повторно пароль"
            value={data.resetPassword}
            errorText={errors.resetPassword}
            onChange={this.onChange}
          /><br />
          <RaisedButton onClick={this.onSubmit} label="Registration" />
        </div>
      </div>
    );
  }
}


export default connect(null, { login })(Registration);
