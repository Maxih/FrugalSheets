import React from 'react';

export default class SaveButton extends React.Component {
  constructor() {
    super();

    this.saveDoc = this.saveDoc.bind(this);
  }
  saveDoc() {
    this.props.saveDocument(this.props.doc);
  }

  render() {
    return (
        <li
          className="style-group-item style-type-save"
          onClick={this.saveDoc}>
        </li>
    );
  }
}
