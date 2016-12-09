import { connect } from 'react-redux';
import { changeActiveSheet, addSheet } from '../../actions/sheet_actions';
import SheetNav from './sheet_nav';

const mapStateToProps = (state) => {
  const sheetNames = Object.keys(state.doc.sheets).map((id) => {
    return {name: state.doc.sheets[id].name, id: id};
  });


  return {
    sheetNames: sheetNames,
    activeSheet: state.doc.activeSheet
  };
};

const mapDispatchToProps = dispatch => ({
  changeActiveSheet: (sheet) => dispatch(changeActiveSheet(sheet)),
  addSheet: (name) => dispatch(addSheet(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SheetNav);
