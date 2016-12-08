import React from 'react';
import { Link } from 'react-router';

export default class DocList extends React.Component {
  onClick(id) {
    this.props.onClick(id);
  }

  render() {
    const documents = Object.keys(this.props.documents) || [];
    const docList = documents.map((id) => {

      let updated_at = new Date(this.props.documents[id].updated_at);
      return (
        <li key={id} onClick={this.onClick.bind(this, id)}>
          {this.props.documents[id].name}
          <span>{`${updated_at.getMonth()}/${updated_at.getDate()}/${updated_at.getYear()}`}</span>
        </li>
      );
    });

    return (
      <ul className="document-list">
        {docList}
      </ul>
    );
  }
}
