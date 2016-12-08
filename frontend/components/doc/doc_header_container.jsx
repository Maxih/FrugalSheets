import { connect } from 'react-redux';
import { updateDocumentName } from '../../actions/sheet_actions';
import DocHeader from './doc_header';

const mapStateToProps = (state) => {
  return {
    name: state.doc.name
  };
};

const mapDispatchToProps = dispatch => ({
  updateDocumentName: (name) => dispatch(updateDocumentName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocHeader);
