import React from 'react';
import { Link, withRouter } from 'react-router';

class DocHeader extends React.Component {
  constructor() {
    super();

    this.state = {
      docName: ""
    }

    this.onNameChange = this.onNameChange.bind(this);
  }

  onNameChange(e) {
    this.setState({docName: e.target.value});
  }

  render() {
    return (
        <nav>
          <span className="doc-home-link">
            <Link href="/#/"></Link>
          </span>
          <span className="doc-title">
            <input type="text" value={this.state.docName} onChange={this.onNameChange} />
          </span>
        </nav>
    )
  }
};

export default DocHeader;
