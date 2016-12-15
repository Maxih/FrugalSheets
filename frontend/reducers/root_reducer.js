import {
  combineReducers
} from 'redux';
import SessionReducer from './session_reducer';
import DocumentReducer from './document_reducer';
import SheetReducer from './sheet_reducer';
import GroupReducer from './group_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  documents: DocumentReducer,
  doc: SheetReducer,
  groups: GroupReducer,
});

export default rootReducer;
