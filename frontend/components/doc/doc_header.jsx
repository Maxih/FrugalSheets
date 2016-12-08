import React from 'react';
import { Link, withRouter } from 'react-router';

const DocHeader = (props) => {
  return (
      <nav>
        <span className="doc-home-link">
          <Link href="/#/"></Link>
        </span>
      </nav>
  )
};

export default DocHeader;
