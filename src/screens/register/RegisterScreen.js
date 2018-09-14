import { connect } from 'react-redux';
import RegisterScreenComponent from './RegisterScreenComponent';
import { registerUser, resetAuth } from '../../reducers/auth/authActions';

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    registerError: state.auth.registerError
  };
};

const mapDispatchToProps = {
  registerUser,
  resetAuth
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreenComponent);
