import React from 'react';

const LineThroughButton = (props) => {
  return (
      <li
        className={props.active ? "style-group-item style-type-linethrough" : "style-group-item style-type-linethrough active-style"}
        onClick={props.toggleStyle}>
      </li>
  )
};

export default LineThroughButton;
