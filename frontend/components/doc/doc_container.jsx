import { connect } from 'react-redux';
import { receiveStartCoord, receiveEndCoord, tempEndCoord, updateCell } from '../../actions/sheet_actions';
import Doc from './doc';

const mapStateToProps = (state) => {
  return {
    loggedIn: !!state.session.email,
    user: state.session,
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Doc);
