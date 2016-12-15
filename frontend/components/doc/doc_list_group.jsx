import React from 'react';
import { Link } from 'react-router';
import dateFormat from 'dateformat';

const formatDate = (date) => {
  let curTime = new Date();

  if(curTime - date < 1000 * 60 * 60 * 24)
    return dateFormat(date, "h:MM TT");
  else
    return dateFormat(date, "mmm d, yyyy");
}

const DocListGroup = (props) => {

  const {doc, onClick} = props;

  if(doc.docs.length === 0) {
    return (
      <section className="document-list-group"></section>
    );
  }

  const docList = doc.docs.map(curDoc => {
    return (
      <li key={curDoc.id} onClick={() => onClick(curDoc.id)}>
        <span className="document-logo"></span>
        <span className="document-name">{curDoc.name}</span>
        <span className="document-owner">{curDoc.group_name}</span>
        <span className="document-date">{formatDate(new Date(curDoc.updated_at))}</span>
      </li>
    );
  });

  return (
    <section className="document-list-group">
      <span className="document-list-title">{doc.name}</span>
      <ul className="document-list">
        {docList}
      </ul>
    </section>
  );
};

export default DocListGroup;
