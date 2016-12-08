import React from 'react';
import { Link, withRouter } from 'react-router';
import DocList from '../doc/doc_list';
import * as Util from '../../utils/grid_utils';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.createDoc = this.createDoc.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocuments();
  }

  componentDidUpdate() {
		this.redirectIfLoggedOut();
	}

  redirectIfLoggedOut() {
    if (!this.props.loggedIn) {
      this.props.router.push("/login");
    }
  }

  logout() {
    this.props.logout();
  }

  createDoc() {
    this.props.createDocument(Util.blankSheet()).then(
      newDoc => this.openNewDoc(newDoc)
    );
  }

  openDoc(id) {
    this.props.loadDocument(id).then(
      newDoc => this.openNewDoc(newDoc)
    );
  }

  openNewDoc({doc}) {
    this.props.router.push(`/documents/${doc.id}`);
  }

  render() {

    return (
      <section>
        <header className="page-header">
          <nav>
            <h1>Welcome Back {this.props.user.firstname}</h1>
            <button onClick={this.logout.bind(this)}>Logout</button>
          </nav>
        </header>
        <section className="document-picker">
          <article>
            <h2>Start a new spreadsheet</h2>
            <ul>
              <li>
                <span onClick={this.createDoc} className="document-thumb">+</span>
                <h3>Blank</h3>
              </li>
            </ul>
          </article>
        </section>
        <section className="page-body">
          <DocList onClick={this.openDoc.bind(this)} documents={this.props.documents} />
        </section>
      </section>
    );
  }
}
