import {combineReducers} from 'redux';
import {SessionReducer} from './session_reducer';
import {DocumentReducer} from './document_reducer';
import SheetReducer from './sheet_reducer';

const rootReducer = combineReducers({
  session: SessionReducer,
  documents: DocumentReducer,
  doc: SheetReducer
});

export default rootReducer;
