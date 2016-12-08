import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';


export default class DocList extends React.Component {
  onClick(id) {
    this.props.onClick(id);
  }

  orderByDate() {
    const timeGroups = [
      {
        name: "Today",
        docs: [],
        time: 1000 * 60 * 60 * 1
      },
      {
        name: "Yesterday",
        docs: [],
        time: 1000 * 60 * 60 * 2
      },
      {
        name: "Previous 7 days",
        docs: [],
        time: 1000 * 60 * 60 * 3
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
      if(doc.docs.length > 0) {
        const docList = doc.docs.map(curDoc => {
          return this.listItem(curDoc);
        });
        return (
          <section key={idx} className="document-list-group">
            <span className="document-list-title">{doc.name}</span>
            <ul className="document-list">
              {docList}
            </ul>
          </section>
        );
      } else {
        return "";
      }
    });

    return (
      <section className="document-list-range">
        {docLists}
      </section>
    );
  }

  listItem(doc) {
    return (
      <li key={doc.id} onClick={this.onClick.bind(this, doc.id)}>
        {doc.name}
        <span>{this.formatDate(new Date(doc.updated_at))}</span>
      </li>
    );
  }

  formatDate(date) {
    let curTime = new Date();

    if(curTime - date < 1000 * 60 * 60 * 24)
      return dateFormat(date, "h:MM TT");
    else
      return dateFormat(date, "mmm d, yyyy");
  }

  render() {
    return this.orderByDate();
  }
}
