import { connect } from 'react-redux';
import MainScreenComponent from './MainScreenComponent';

const mapStateToProps = state => {
  return { isAuthenticated: state.auth.isAuthenticated };
};

export default connect(
  mapStateToProps,
  {}
)(MainScreenComponent);
