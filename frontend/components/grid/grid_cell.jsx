import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';
import CellInputContainer from '../tool/cell_input_container';
import {Formula} from '../../utils/formula_util';


export default class GridCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: this.props.cell.content
    }

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseAction = this.mouseAction.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    let havePropsChanged = !Util.compare(this.props.cell, nextProps.cell);

    if(nextProps.cell.content[0] === "=") {
      const nextContent = this.parseFormula(nextProps.cell.content);
      if(this.state.content !== nextContent) {
        this.setState({content: nextContent});
        return true;
      }
    }

    return (havePropsChanged ||
        this.props.selected !== nextProps.selected ||
        this.props.active !== nextProps.active
    );
  }

  mouseAction(e) {
    const {rowId, colId} = this.props;
    const {receiveStartCell, receiveEndCell} = this.props;

    if(e.type === "mouseup") {
      receiveEndCell(this.props.cell);
    } else {
      if(this.props.cell.content[0] === "=") {
        const formula = new Formula(this.props.cell.content);
        this.props.updateRangeGroups(Object.keys(formula.vars));
      } else {
        this.props.updateRangeGroups([]);
      }

      receiveStartCell(this.props.cell, false);
    }
  }

  mouseOver() {
    const {rowId, colId, tempEndCell} = this.props;

    if(this.props.selecting)
      tempEndCell(this.props.cell);
  }

  generateCellClass() {
    let className = "grid-cell unselectable";

    if(this.props.active)
      className += " active-cell";

    return className;
  }

  parseFormula(text) {
    let parsed = text;
    const formula = new Formula(text.slice(1));
    const vars = Object.keys(formula.vars);
    const mappedVar = {};

    vars.forEach((curVar) => {

      let coords = Util.getFormulaRange(this.props.grid, curVar);
      let curContent = [];
      for(let i = 0; i < coords.length; i++) {
        curContent.push(coords[i].map((coord) => {
          let cur = this.props.grid[coord.pos.row][coord.pos.col].content;

          if(cur[0] === "=")
            cur = this.parseFormula(cur);

          return cur;
        }));
      }

      mappedVar[curVar] = curContent;
    });

    parsed = formula.parse(mappedVar);

    return parsed;
  }

  render() {
    let content = this.props.cell.content;

    if(this.props.active) {
      content = (
        <div className="active-cell-wrapper">
          <CellInputContainer
            styling={true}
            refName="cellRef"
            cell={this.props.cell}
            resizeRow={this.props.resizeRow}
            updateCell={this.props.updateCell} />
        </div>
        );
    } else {
      if(content[0] === "=") {
        content = this.parseFormula(content);
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
        onMouseDown={this.mouseAction}
        onMouseUp={this.mouseAction}
        onMouseOver={this.mouseOver}
        style={style}
        >
        {content}
      </span>
    );
  }
}
