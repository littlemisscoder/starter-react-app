import { connect } from 'react-redux';
import LoginScreenComponent from './LoginScreenComponent';
import { loginUser, resetAuth } from '../../reducers/auth/authActions';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loginError: state.auth.loginError
  };
};

const mapDispatchToProps = {
  loginUser,
  resetAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreenComponent);
