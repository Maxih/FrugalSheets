import React from 'react';

const LineThroughButton = (props) => {
  return (
      <li
        className={props.active ? "style-type-linethrough" : "style-type-linethrough active-style"}
        onClick={props.toggleStyle}>
      </li>
  )
};

export default LineThroughButton;
