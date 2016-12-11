import React from 'react';
import {merge} from 'lodash';
import ReactDOM from 'react-dom';
import autosize from 'autosize';
import {Formula} from '../../utils/formula_util';


export default class CellInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.cell.content
    }

    this.cellChanged = this.cellChanged.bind(this);
  }

  componentDidMount() {
    if(this.refs[this.props.refName]) {
      const node = ReactDOM.findDOMNode(this.refs[this.props.refName])
      // node.focus();
      // autosize(node);
    }
  }

  cellChanged(e) {
    const newCell = merge({}, this.props.cell, {content: e.target.value});

    if(newCell.content[0] === "=") {
      const formula = new Formula(newCell.content);
      this.props.updateRangeGroups(Object.keys(formula.vars));
    } else {
      this.props.updateRangeGroups([]);
    }

    this.setState({content: newCell.content});
    // let height = this.refs[this.props.refName].clientHeight;
    // if(height > this.props.cell.height && height > 30) {
    //   this.props.resizeRow(this.props.cell.pos.row, height);
    // }

    this.props.updateCell(newCell);
  }



  render() {
    if(this.props.styling) {
      return (
        <textarea style={this.props.cell.style} className="cell-val-textarea grid-text" ref={this.props.refName} onChange={this.cellChanged} value={this.props.cell.content} />
      );
    }

    return (
      <input type="text" className="cell-val-textarea" ref={this.props.refName} onChange={this.cellChanged} value={this.props.cell.content} />
    );
  }
}
