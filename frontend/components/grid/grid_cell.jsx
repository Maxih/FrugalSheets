import React from 'react';
import * as Util from '../../utils/grid_utils';
import {merge} from 'lodash';
import CellInputContainer from '../tool/cell_input_container';
import {Formula} from '../../utils/formula_util';


export default class GridCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.cell.content
    }

    this.mouseOver = this.mouseOver.bind(this);
    this.mouseAction = this.mouseAction.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    let havePropsChanged = !Util.compare(this.props.cell, nextProps.cell);

    if(nextProps.cell.content[0] === "=") {
      const formula = new Formula(nextProps.cell.content.slice(1));
      const oldLinks = Util.getLinkedCells(this.props.grid, formula.vars);
      const newLinks = Util.getLinkedCells(nextProps.grid, formula.vars);
      for(let i = 0; i < oldLinks.length; i++) {
        if(!Util.compare(oldLinks[i], newLinks[i])) {
          return true;
        }
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
      receiveStartCell(this.props.cell);
    }
  }

  mouseOver() {
    const {rowId, colId, tempEndCell} = this.props;

    if(this.props.selecting)
      tempEndCell(this.props.cell);
  }

  generateCellClass() {
    let className = "grid-cell";

    if(this.props.selected) {
      className += " selected-cell";
    }

    if(this.props.active)
      className += " active-cell";

      return className;
  }

  parseFormula(text) {
    const formula = new Formula(text.slice(1));
    const vars = Object.keys(formula.vars);
    const mappedVar = {};

    vars.forEach((curVar) => {
      let coord = Util.parseCoord(curVar)
      mappedVar[curVar] = this.props.grid[coord.row][coord.col].content;
    });

    let parsed = formula.parse(mappedVar);

    if(!parsed)
      return "NaN";

    return formula.parse();
  }

  render() {
    let content = this.props.cell.content;


    if(this.props.active) {
      content = (
        <CellInputContainer styling={true} refName="cellRef" cell={this.props.cell} updateCell={this.props.updateCell} />
      );
    } else {
      if(content[0] === "=") {
        content = this.parseFormula(content);
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
