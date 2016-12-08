import { connect } from 'react-redux';
import { loadDocument } from '../../actions/sheet_actions';
import Doc from './doc';

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.session.email,
    user: state.session,
  };
};

const mapDispatchToProps = dispatch => ({
  loadDocument: (id) => dispatch(loadDocument(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doc);
