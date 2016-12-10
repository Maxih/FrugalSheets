import React from 'react';
import {merge} from 'lodash';
import { CompactPicker } from 'react-color';


export default class ColorButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pickingColor: false
    }

    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.cellColorChange = this.cellColorChange.bind(this);
  }

  cellColorChange(color, event) {
    this.props.changeStyle(color.hex);

    this.setState({pickingColor: false});
  }

  toggleColorPicker(e) {
    this.setState({pickingColor: !this.state.pickingColor});
  }

  render() {
    const cellStyle = this.props.color || {};

    const colorPicker = (
      <div className="color-picker">
        <CompactPicker onChange={this.cellColorChange}/>
      </div>
    )

    return (
      <li className={`${this.props.className} style-group-item${this.state.pickingColor ? " active-style" : ""}`}
          onClick={this.toggleColorPicker}>
        <span className="paintbucket-swatch" style={cellStyle[this.props.styleProperty] ? {backgroundColor: cellStyle[this.props.styleProperty] } : {backgroundColor: "#FFF" }}></span>
        {this.state.pickingColor ? colorPicker : ""}
        <span className="dropdown-arrow"></span>
      </li>
    );
  }
}
