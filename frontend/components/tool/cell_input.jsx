import React from 'react';
import {merge} from 'lodash';
import ReactDOM from 'react-dom';


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
      ReactDOM.findDOMNode(this.refs[this.props.refName]).focus();
    }
  }

  cellChanged(e) {
    const newCell = merge({}, this.props.cell, {content: e.target.value});

    this.setState({content: newCell.content});

    this.props.updateCell(newCell);
  }

  render() {
    const style = this.props.styling ? this.props.cell.style : {};
    return (
      <textarea style={style} className="cell-val-textarea" ref={this.props.refName} onChange={this.cellChanged} value={this.props.cell.content} />
    );
  }
}
