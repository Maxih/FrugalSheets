import React from 'react';
import {numToChar, between, blankSheet, parseCoord, curCell} from '../../utils/grid_utils';
import GridRow from './grid_row';
import GridHeader from './grid_header';
import GridSelectionContainer from './grid_selection_container';
import GridSelectionGroupContainer from './grid_selection_group_container';
import {Formula} from '../../utils/formula_util';
import FloatingChartsContainer from '../tool/floating_charts_container';



export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.removeSelecting = this.removeSelecting.bind(this);
    this.mouseAction = this.mouseAction.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
    this.keyPress = this.keyPress.bind(this);
  }

  componentDidMount() {
    $(".grid-wrapper").on( 'mousewheel DOMMouseScroll', function (e) {

      const e0 = e.originalEvent;

      let deltaY = e0.wheelDeltaY;
      let scrollDistanceY = (deltaY < 0 ? 1 : -1 ) * 30;

      let deltaX = e0.wheelDeltaX;
      let scrollDistanceX = (deltaX < 0 ? 1 : -1 ) * 30;

      this.scrollTop += scrollDistanceY;
      this.scrollLeft += scrollDistanceX;

      e.preventDefault();
    });

    $(".grid-wrapper").scroll(function(e){
      $(".grid-column-labels").css("top", this.scrollTop);
      $(".grid-row-labels").css("left", this.scrollLeft);
      $(".grid-blank-label").css("top", this.scrollTop);
      $(".grid-blank-label").css("left", this.scrollLeft);
    });

  }

  removeSelecting(event) {
    this.props.receiveEndCell(null);
  }

  shouldComponentUpdate(nextProps) {
    if(this.props.activeSheet !== nextProps.activeSheet)
      return true;

    return false;
  }

  rowHeads() {
    let rows = [];
    for(let i = 0; i < this.props.rows; i++) {
      rows.push({
        content: `${i+1}`,
      });
    }
    return rows;
  }

  colHeads() {
    let cols = [];
    for(let i = 0; i < this.props.cols; i++) {
      const colId = numToChar( i + 1 )
      cols.push({
        content: colId,
      });
    }
    return cols;
  }

  mouseAction(e) {
    let node = e.target
    while(node.parentNode !== null && node.id === "") {
      node = node.parentNode;
    }

    if(!parseCoord(node.id))
      return false;

    const cell = curCell(this.props.cells, node.id);

    if(cell === undefined)
      return false;

    const {receiveStartCell, receiveEndCell, updateRangeGroups} = this.props;

    e.stopPropagation();


    if(e.type === "mouseup") {
      receiveEndCell(cell);
    } else {
      if(cell.content[0] === "=") {
        const formula = new Formula(cell.content);
        updateRangeGroups(Object.keys(formula.vars));
      } else {
        updateRangeGroups([]);
      }
      receiveStartCell(cell, false);
    }
  }

  mouseOver(e) {
    const {tempEndCell} = this.props;

    if(e.target.id === "")
      return false;

    const cell = curCell(this.props.cells, e.target.id);

    if(cell === undefined)
      return false;

    e.stopPropagation();

    if(this.props.selecting) {
      tempEndCell(cell);
    }
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
    const rows = [];

    for(let i = 0; i < this.props.rows; i++) {
      let rowId = i + 1;
      rows.push(
        <GridRow key={rowId} rowId={rowId} cols={this.props.cols} />
      );
    }

    return (
      <section className="grid-wrapper" onMouseLeave={this.removeSelecting}>
        <span className="grid-blank-label"></span>
        <span className="grid-column-labels">
          <GridHeader row={this.colHeads()}/>
        </span>
        <span className="grid-row-labels">
          <GridHeader row={this.rowHeads()} col={true} />
        </span>
        <section className="grid"
          onKeyDown={this.keyPress}
          tabIndex="1"
          onMouseDown={this.mouseAction}
          onMouseUp={this.mouseAction}
          onMouseOver={this.mouseOver}
          >
          <FloatingChartsContainer />
          <GridSelectionContainer />
          <GridSelectionGroupContainer />
          {rows}
        </section>
      </section>
    );
  }
}
