import {connect} from 'react-redux';
import LandingPage from './landing_page';
import * as Action from '../../actions/session_actions';
import {fetchDocuments, filterDocuments} from '../../actions/document_actions';
import {createDocument, loadDocument} from '../../actions/sheet_actions';
import {applySearchParam, applyGroupFilter} from '../../reducers/selectors';

const mapStateToProps = state => ({
  loggedIn: state.session.loggedIn,
  currentUser: state.session.currentUser,
  documents: applySearchParam(applyGroupFilter(state.documents.list, state.groups.active), state.documents.searchParam),
  searchParam: state.documents.searchParam,
});

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(Action.logout()),
    fetchDocuments: () => dispatch(fetchDocuments()),
    createDocument: () => dispatch(createDocument()),
    loadDocument: (id) => dispatch(loadDocument(id)),
    filterDocuments: (searchParam) => dispatch(filterDocuments(searchParam))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage);
