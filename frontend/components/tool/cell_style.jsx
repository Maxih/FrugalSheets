import React from 'react';
import {merge} from 'lodash';
import { CompactPicker } from 'react-color';
import {LightenDarkenColor} from '../../utils/grid_utils';
import BoldButton from './tool_box_buttons/bold_button';
import ItalicButton from './tool_box_buttons/italic_button';
import LineThroughButton from './tool_box_buttons/linethrough_button';
import ColorButton from './tool_box_buttons/color_button';
import FontSizeButton from './tool_box_buttons/font_size_button';
import FontFamilyButton from './tool_box_buttons/font_family_button';
import SaveButtonContainer from './tool_box_buttons/save_button_container';
import ChartButtonContainer from './tool_box_buttons/chart_button_container';


export default class CellStyle extends React.Component {
  constructor(props) {
    super(props);
  }

  toggleStyle(style) {
    if(this.props.cell.style === undefined)
      return;

    const newStyledCell = merge({}, this.props.cell);
    const keys = Object.keys(style);

    if(newStyledCell.style[keys[0]] === undefined)
      newStyledCell.style = merge(newStyledCell.style, style);
    else
      delete newStyledCell.style[keys[0]];

    this.props.updateRange(newStyledCell);
  }

  changeStyle(style, value) {
    if(this.props.cell.style === undefined)
      return;

    const newStyledCell = merge({}, this.props.cell);

    newStyledCell.style[style] = value;
    this.props.updateRange(newStyledCell);
  }

  changeBackground(value) {
    if(this.props.cell.style === undefined)
      return;

    const newStyledCell = merge({}, this.props.cell);

    newStyledCell.style["backgroundColor"] = value;
    newStyledCell.style["borderColor"] = LightenDarkenColor(value, -40);

    this.props.updateRange(newStyledCell);
  }

  saveDoc() {
    this.props.saveDocument(this.props.grid);
  }

  render() {
    const cellStyle = this.props.cell.style || {};

    const colorPicker = (
      <div className="color-picker">
        <CompactPicker onChange={this.cellColorChange}/>
      </div>
    )

    return (
      <div className="style-bar">
        <ul className="style-group">
          <SaveButtonContainer />
        </ul>
        <ul className="style-group">
          <FontFamilyButton family={this.props.cell.style} changeStyle={this.changeStyle.bind(this)} />
        </ul>
        <ul className="style-group">
          <FontSizeButton size={this.props.cell.style} changeStyle={this.changeStyle.bind(this)} />
        </ul>
        <ul className="style-group">
          <BoldButton toggleStyle={this.toggleStyle.bind(this, {"fontWeight": "bold"})} active={cellStyle.fontWeight === undefined} />
          <ItalicButton toggleStyle={this.toggleStyle.bind(this, {"fontStyle": "italic"})} active={cellStyle.fontStyle === undefined} />
          <LineThroughButton toggleStyle={this.toggleStyle.bind(this, {"textDecoration": "line-through"})} active={cellStyle.textDecoration === undefined} />
          <ColorButton color={this.props.cell.style} styleProperty="color" changeStyle={this.changeStyle.bind(this, "color")} className="style-type-fontcolor" />
        </ul>
        <ul className="style-group">
          <ColorButton color={this.props.cell.style} styleProperty="backgroundColor" changeStyle={this.changeBackground.bind(this)} className="style-type-paintbucket" />
        </ul>
        <ChartButtonContainer cell={this.props.cell} />

      </div>
    );
  }
}
