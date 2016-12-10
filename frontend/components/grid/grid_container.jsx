import {connect} from 'react-redux';
import {receiveEndCell} from '../../actions/sheet_actions';

import Grid from './grid';

const mapStateToProps = (state) => {
  return {
    grid: state.doc.sheets[state.doc.activeSheet].data,
    activeSheet: state.doc.activeSheet
  };
};

const mapDispatchToProps = dispatch => ({
  receiveEndCell: (cell) => dispatch(receiveEndCell(cell))
});

export default connect(mapStateToProps, mapDispatchToProps)(Grid);
