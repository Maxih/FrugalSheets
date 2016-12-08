import React from 'react';
import CellInputContainer from './cell_input_container';
import CellStyleContainer from './cell_style_container';

export default class ToolBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="toolbox">
        <section className="cell-style">
          <CellStyleContainer updateRange={this.props.updateRange} cell={this.props.activeCell} />
        </section>

        <section className="formula-bar">
          <span className="formula-logo">fx</span>
          <span className="formula">
            <CellInputContainer styling={false} refName="formulaRef" updateCell={this.props.updateCell} cell={this.props.activeCell} />
          </span>
        </section>
      </section>
    );
  }
}
