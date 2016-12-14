import React from 'react';
import CellInputContainer from './cell_input_container';
import CellStyleContainer from './cell_style_container';

export default class ToolBox extends React.Component {
  constructor(props) {
    super(props);


    this.keyPress = this.keyPress.bind(this);
  }

  keyPress(e) {

  }




  render() {
    return (
      <section className="toolbox">
        <section className="cell-style-wrapper">
          <CellStyleContainer updateRange={this.props.updateRange} cell={this.props.activeCell} />
        </section>
        <section className="formula-bar">
          <span className="formula-logo">fx</span>
          <span className="formula">
            <CellInputContainer styling={false} keyPress={this.keyPress} refName="formulaRef" updateCell={this.props.updateCell} cell={this.props.activeCell} />
          </span>
        </section>
      </section>
    );
  }
}
