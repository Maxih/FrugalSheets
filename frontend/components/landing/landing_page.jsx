import React from 'react';
import { Link, withRouter } from 'react-router';
import DocList from '../doc/doc_list';
import * as Util from '../../utils/grid_utils';
import UserBadge from '../user/user_badge';

export default class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.createDoc = this.createDoc.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    this.props.fetchDocuments();
  }


  createDoc() {
    this.props.createDocument(Util.blankSheet()).then(
      newDoc => this.openDoc(newDoc.doc.id)
    );
  }

  openDoc(id) {
    this.props.router.push(`/documents/${id}`);
  }

  logOut() {
    this.props.logout().then(() => {
      this.props.router.push('/login');
    });
  }

  render() {

    const documents = Object.keys(this.props.documents).map(doc=>this.props.documents[doc]);

    return (
      <section>
        <header className="page-header">
          <nav>
            <DocSearchContainer />
            <UserBadge logOut={this.logOut} currentUser={this.props.currentUser} />
          </nav>
        </header>
        <section className="document-picker">
          <article>
            <h2>{"Start a new spreadsheet"}</h2>
            <ul>
              <li>
                <span onClick={this.createDoc} className="document-thumb">+</span>
                <h3>Blank</h3>
              </li>
            </ul>
          </article>
        </section>
        <section className="page-body">
          <DocList onClick={this.openDoc.bind(this)} documents={documents} />
        </section>
      </section>
    );
  }
}
