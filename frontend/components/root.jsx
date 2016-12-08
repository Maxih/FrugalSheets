import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import SessionFormContainer from './session/session_form_container';
import LandingPageContainer from './landing/landing_page_container';
import DocContainer from './doc/doc_container';

const Root = function({ store }) {
  const _ensureLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (!currentUser) {
      replace('/login');
    }
  };

  const _redirectIfLoggedIn = (nextState, replace) => {
    const currentUser = store.getState().session.currentUser;
    if (currentUser) {
      replace('/');
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/">
          <IndexRoute onEnter={_ensureLoggedIn} component={ LandingPageContainer } />
          <Route path="/documents/:documentId" onEnter={_ensureLoggedIn} component={ DocContainer } />
          <Route path="/signup" onEnter={_redirectIfLoggedIn} component={ SessionFormContainer } />
          <Route path="/login" onEnter={_redirectIfLoggedIn} component={ SessionFormContainer } />
        </Route>
      </Router>
    </Provider>
  );
};

export default Root;
