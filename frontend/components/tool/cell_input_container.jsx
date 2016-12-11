import { connect } from 'react-redux';
import { updateRangeGroups } from '../../actions/sheet_actions';
import CellInput from './cell_input';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    updateRangeGroups: (groups) => dispatch(updateRangeGroups(groups)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CellInput);
