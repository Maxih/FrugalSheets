import { connect } from 'react-redux';
import { saveDocument } from '../../../actions/sheet_actions';
import SaveButton from './save_button';

const mapStateToProps = (state) => {
  return {
    doc: state.doc
  };
};

const mapDispatchToProps = dispatch => ({
  saveDocument: (doc) => dispatch(saveDocument(doc))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SaveButton);
