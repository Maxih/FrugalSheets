import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';
import CellInputContainer from '../tool/cell_input_container';
import {Formula} from '../../utils/formula_util';


export default class GridCell extends React.Component {
  constructor(props) {
    super(props);

    this.keyPress = this.keyPress.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    console.log("thinkin bout it");

    if(nextProps.cell.content[0] === "=") {
      const curContent = this.parseFormula(this.props.cell.content, this.props.grid);
      const nextContent = this.parseFormula(nextProps.cell.content, nextProps.grid);

      if(curContent !== nextContent) {
        return true;
      }
    }
    return (this.props.cell.shouldUpdate !== nextProps.cell.shouldUpdate) || this.props.active !== nextProps.active;
  }

  generateCellClass() {
    let className = "grid-cell unselectable";

    if(this.props.active)
      className += " active-cell";

    return className;
  }

  parseFormula(text, grid) {
    let parsed = text;
    const formula = new Formula(text.slice(1));
    const vars = Object.keys(formula.vars);
    const mappedVar = {};

    vars.forEach((curVar) => {

      let coords = Util.getFormulaRange(grid, curVar);
      let curContent = [];
      for(let i = 0; i < coords.length; i++) {
        curContent.push(coords[i].map((coord) => {
          let cur = grid[coord.pos.row][coord.pos.col].content;

          if(cur[0] === "=")
            cur = this.parseFormula(cur, grid);

          return cur;
        }));
      }

      mappedVar[curVar] = curContent;
    });

    parsed = formula.parse(mappedVar);

    return parsed;
  }

  keyPress(e) {
    e.stopPropagation();

    switch(e.keyCode) {
      case 13: // enter
        e.preventDefault();
        if(e.shiftKey) // shift enter
          this.props.moveActiveCell({row: -1, col: 0});
        else
          this.props.moveActiveCell({row: 1, col: 0});
        break;
      case 9: // tab
        e.preventDefault();
        if(e.shiftKey)
          this.props.moveActiveCell({row: 0, col: -1});
        else
          this.props.moveActiveCell({row: 0, col: 1});
        break;
      case 37:
        e.preventDefault();
        if(e.shiftKey)
          this.props.moveActiveRange({row: 0, col: -1});
        else
          this.props.moveActiveCell({row: 0, col: -1});
        break;
      case 38:
        e.preventDefault();
        if(e.shiftKey)
          this.props.moveActiveRange({row: -1, col: 0});
        else
          this.props.moveActiveCell({row: -1, col: 0});
        break;
      case 39:
        e.preventDefault();
        if(e.shiftKey)
          this.props.moveActiveRange({row: 0, col: 1});
        else
          this.props.moveActiveCell({row: 0, col: 1});
        break;
      case 40:
        e.preventDefault();
        if(e.shiftKey)
          this.props.moveActiveRange({row: 1, col: 0});
        else
          this.props.moveActiveCell({row: 1, col: 0});
        break;
    }
  }

  render() {
    let content = this.props.cell.content;

    if(this.props.active) {
      content = (
        <div
          className="active-cell-wrapper"
          >
          <CellInputContainer
            styling={true}
            refName="cellRef"
            cell={this.props.cell}
            resizeRow={this.props.resizeRow}
            keyPress={this.keyPress}
            updateCell={this.props.updateCell} />
        </div>
        );
    } else {
      if(content[0] === "=") {
        content = this.parseFormula(content, this.props.grid);
        this.curFormulaEval = content;
      }
    }

    const style = merge({}, this.props.cell.style, {
      width: this.props.cell.width,
      height: this.props.cell.height
    });

    return (
      <span
        className={this.generateCellClass()}
        id={this.props.id}
        style={style}
        onKeyDown={this.keyPress}
        tabIndex="1"
        >
        {content}
      </span>
    );
  }
}
