import React from 'react';
import GridContainer from '../grid/grid_container';
import SheetNavContainer from './sheet_nav_container';
import ToolBoxContainer from '../tool/tool_box_container';
import DocHeader from './doc_header';

export default class Doc extends React.Component {
  render() {
    return (

      <section className="doc-wrapper">
        <header className="doc-header">
          <DocHeader />
        </header>
        <section className="doc-editor">
          <ToolBoxContainer />
        </section>
        <section className="doc">
          <GridContainer />
        </section>
        <section className="sheet-nav">
          <SheetNavContainer />
        </section>
      </section>
    );
  }
}
