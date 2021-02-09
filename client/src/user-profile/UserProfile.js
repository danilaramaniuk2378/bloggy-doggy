import React from 'react';
import { connect } from 'react-redux';

class UserProfile extends React.Component {
  submit = (values) => {
    console.log(values);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>User Profile</h1>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(UserProfile);
