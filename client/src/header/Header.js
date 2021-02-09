import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Avatar, IconMenu, MenuItem, RaisedButton } from 'material-ui';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '~/actions/auth';
import './style.less';

class Header extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  getUserLoged = () => {
    const { user, logout } = this.props;
    // TODO: rebuild
    return (
      <div className="Header__logged">
        <RaisedButton onClick={this.redirectToAddFlat} label="Добавить квартиру" className="Header__logged__addFlat" />
        <IconMenu
          iconButtonElement={<Avatar src="http://www.file-extensions.org/imgs/app-icon/128/5399/super-mario-bros-x-icon.png" />}
        >
          <MenuItem onClick={this.redirectToUserProfile} primaryText={user.username || user.email} />
          <MenuItem onClick={logout} primaryText="Logout" />
        </IconMenu>
      </div>
    );
  }

  redirectToUserProfile = () => {
    const { user, history } = this.props;

    history.push(`/user-profile/${user._id}`);
  }

  redirectToAddFlat = () => {
    const { history } = this.props;

    history.push('/add-flat');
  }

  noAuthUser = () => (<span><Link to="/login">Login</Link> <Link to="/registration">Registration</Link></span>)

  render() {
    const { user } = this.props;

    return (
      <div className="Header">
        <span className="Header__logo">
          <Link to="/">сдам.by</Link>
        </span>
        <span className="Header__right">
          {
            _.isEmpty(user)
            ? (<span><Link to="/login">Login</Link> <Link to="/registration">Registration</Link></span>)
            : this.getUserLoged()
          }
        </span>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, { logout: actions.logout })(Header));
