import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';
import DocListGroup from  './doc_list_group';

export default class DocList extends React.Component {
  constructor() {
    super();

    this.onClick = this.onClick.bind(this);
  }

  onClick(id) {
    this.props.onClick(id);
  }

  orderByDate() {
    const timeGroups = [
      {
        name: "Today",
        docs: [],
        time: 1000 * 60 * 60 * 24
      },
      {
        name: "Yesterday",
        docs: [],
        time: 1000 * 60 * 60 * 24 * 2
      },
      {
        name: "Previous 7 days",
        docs: [],
        time: 1000 * 60 * 60 * 24 * 7
      },
      {
        name: "Earlier",
        docs: [],
        time: -1
      }
    ];

    const docList = this.props.documents.forEach((doc) => {
      let updatedAt = new Date(doc.updated_at);
      let curTime = new Date();

      let timeElapsed = curTime - updatedAt;

      for(let i = 0; i < timeGroups.length; i++) {
        if(timeElapsed < timeGroups[i].time || timeGroups[i].time < 0) {
          timeGroups[i].docs.push(doc);
          break;
        }
      }
    });

    const docLists = timeGroups.map((doc, idx) => {
      return <DocListGroup key={idx} doc={doc} onClick={this.onClick}/>
    });

    return docLists;
  }

  searchList() {
    const searchString = `Search: ${this.props.documents.length} result(s) for "${this.props.searchParam}"`;
    const docList = {
      name: searchString,
      docs: this.props.documents
    };

    return <DocListGroup doc={docList} onClick={this.onClick}/>
  }

  render() {
    const docList = this.props.searchParam.length === 0 ? this.orderByDate() : this.searchList();
    return (
      <section className="document-list-range">
        {docList}
      </section>
    );
  }
}
