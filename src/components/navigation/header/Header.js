import { connect } from 'react-redux';
import HeaderComponent from './HeaderComponent';
import { logoutUser, resetAuth } from '../../../reducers/auth/authActions';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    username: state.auth.username
  };
};

const mapDispatchToProps = {
  logoutUser,
  resetAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { pure: false }
)(HeaderComponent);
