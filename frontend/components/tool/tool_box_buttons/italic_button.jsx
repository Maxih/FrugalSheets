import React from 'react';

const ItalicButton = (props) => {
  return (
      <li
        className={props.active ? "style-group-item style-type-italic" : "style-group-item style-type-italic active-style"}
        onClick={props.toggleStyle}>
      </li>
  )
};

export default ItalicButton;
