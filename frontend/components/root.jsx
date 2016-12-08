import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SessionFormContainer from './session/session_form_container';
import LandingPageContainer from './landing/landing_page_container';
import DocContainer from './doc/doc_container';

const Root = function({ store }) {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/">
          <IndexRoute component={ LandingPageContainer } />
          <Route path="/documents/:documentId" component={ DocContainer} />
          <Route path="/login" component={ SessionFormContainer } />
          <Route path="/signup" component={ SessionFormContainer } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
