import {connect} from 'react-redux';
import LandingPage from './landing_page';
import * as Action from '../../actions/session_actions';
import {fetchDocuments} from '../../actions/document_actions';
import {createDocument, loadDocument} from '../../actions/sheet_actions';

const mapStateToProps = state => ({
  loggedIn: !!state.session.email,
  user: state.session,
  errors: state.errors,
  documents: state.documents
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(Action.logout()),
    fetchDocuments: () => dispatch(fetchDocuments()),
    createDocument: () => dispatch(createDocument()),
    loadDocument: (id) => dispatch(loadDocument(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
