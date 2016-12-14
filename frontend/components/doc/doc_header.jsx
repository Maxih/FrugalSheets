import React from 'react';
import { Link } from 'react-router';

class DocHeader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      docName: props.name
    }

    this.onNameChange = this.onNameChange.bind(this);
    this.saveName = this.saveName.bind(this);
  }

  onNameChange(e) {
    this.setState({docName: e.target.value});
  }

  saveName() {
    this.props.updateDocumentName(this.state.docName);
  }

  render() {
    // const name =  size={this.state.docName.length > 5 ? this.state.docName.length+1 : 5};
    return (
        <nav>
          <span className="doc-home-link">
            <Link href="/#/"></Link>
          </span>
          <span className="doc-title">
            <input type="text" value={this.state.docName} onBlur={this.saveName} onChange={this.onNameChange} />
          </span>
        </nav>
    )
  }
};

export default DocHeader;
