import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RaisedButton, TextField } from 'material-ui';

import RecoveryPasswordModel from '~/common/models/lokka/RecoveryPasswordModel';
import Alert from '~/common/components/alerts/Alert';
import { login } from '~/actions/auth';

import './style.less';

class RecoveryPassword extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        recoveryId: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
    login: PropTypes.func.isRequired,
  };

  state = {
    recoveryId: '',
    isUserExist: false,
    loading: true,
    data: {
      newPassword: '',
      repeatNewPassword: '',
    },
    errors: {
      newPassword: '',
      repeatNewPassword: '',
    },
  };

  componentDidMount = async () => {
    const { recoveryId } = this.props.match.params;
    const {
      isUserForRecoveryExist,
    } = await RecoveryPasswordModel.isUserForRecoveryExist(recoveryId);

    this.setState({
      isUserExist: isUserForRecoveryExist,
      recoveryId,
      loading: false,
    });
  }

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
        const { data, recoveryId } = this.state;
        const { resetPassword } = await RecoveryPasswordModel.resetPassword({
          recoveryToken: recoveryId,
          password: data.newPassword,
        });
        this.props.login(resetPassword.token, resetPassword.refreshToken);
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

    if (!data.newPassword) errors.newPassword = 'Can\'t be blank';
    if (data.newPassword !== data.repeatNewPassword) errors.repeatNewPassword = 'Пароли должны совпадать';

    return errors;
  };

  recovery = () => {
    const { data, errors } = this.state;

    return (
      <div className="RecoveryPassword">
        <h1>Восстановить пароль!</h1>
        <TextField
          type="password"
          id="newPassword"
          name="newPassword"
          hintText="Введите новый пароль"
          value={data.newPassword}
          errorText={errors.newPassword}
          onChange={this.onChange}
          key="new-password"
        /><br />
        <TextField
          type="password"
          id="repeatNewPassword"
          name="repeatNewPassword"
          hintText="Введите повторно новый пароль"
          value={data.repeatNewPassword}
          errorText={errors.repeatNewPassword}
          onChange={this.onChange}
          key="repeat-new-password"
        /><br />
        <RaisedButton onClick={this.onSubmit} label="Сменить пароль" key="reset-password-button" />
      </div>
    );
  }

  render() {
    const { loading, isUserExist } = this.state;

    if (loading) {
      return (
        <div>
          LOADING...
        </div>
      );
    }

    return (
      <div>
        {
          isUserExist
           ? this.recovery()
           : <Alert text="No such user for recovery password" type="error" />
        }
      </div>
    );
  }
}

export default connect(null, { login })(RecoveryPassword);
