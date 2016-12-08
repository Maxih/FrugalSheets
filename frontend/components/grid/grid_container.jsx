import { connect } from 'react-redux';
// import {  } from '../../actions/sheet_actions';
import Grid from './grid';

const mapStateToProps = (state) => {
  return {
    grid: state.doc.sheets[state.doc.activeSheet].data,
    activeSheet: state.doc.activeSheet
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Grid);
