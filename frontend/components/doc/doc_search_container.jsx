import { connect } from 'react-redux';
import { filterDocuments } from '../../actions/document_actions';
import DocHeader from './doc_header';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => ({
  filterDocuments (searchParam) => dispatch(filterDocuments(searchParam))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DocHeader);
