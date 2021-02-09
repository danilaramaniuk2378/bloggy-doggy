import React from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import { Link } from 'react-router-dom';
import { RaisedButton, TextField } from 'material-ui';

import { login } from '~/actions/auth';
import AuthModel from '~/common/models/axios/AuthModel';
import OauthPopup from '~/common/components/popups/OauthPopup';
import Alert from '~/common/components/alerts/Alert';

import './style.less';

class Login extends React.Component {
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
    },
    loading: false,
    errors: {
      email: '',
      password: '',
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
        const { data } = await AuthModel.login(this.state.data);
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
    if (!data.password) errors.password = 'Can\'t be blank';
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const loginClass = classNames('Login', {
      Login__block: loading,
    });

    return (
      <div className={loginClass}>
        <h1>Добро пожаловать!</h1>
        { errors.server && <Alert type="error" text={errors.server} /> }
        <div>
          <TextField
            id="email"
            name="email"
            errorText={errors.email}
            hintText="Введите email"
            value={data.email}
            onChange={this.onChange}
          /><br />

          <TextField
            type="password"
            id="password"
            name="password"
            errorText={errors.password}
            hintText="Введите пароль"
            value={data.password}
            onChange={this.onChange}
          /><br />
          <Link to="/forgot-password" className="Login__forgot-password">
            Забыли пароль?
          </Link>
          <RaisedButton onClick={this.onSubmit} label="ВОЙТИ" className="Login__button" />
          <br />
          <div>Войти с помощью</div>
          <OauthPopup
            url="/api/users/auth/facebook-login"
            title="Facebook"
          >
            <SocialIcon
              network="facebook"
              className="Login__share-icon"
            />
          </OauthPopup>
          <OauthPopup
            url="/api/users/auth/google-login"
            title="Google"
          >
            <SocialIcon
              network="google"
              className="Login__share-icon"
            />
          </OauthPopup>
        </div>
      </div>
    );
  }
}


export default connect(null, { login })(Login);
