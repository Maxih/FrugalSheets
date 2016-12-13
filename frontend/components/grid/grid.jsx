import React from 'react';
import {numToChar, between, blankSheet, parseCoord} from '../../utils/grid_utils';
import GridRow from './grid_row';
import GridHeader from './grid_header';
import GridSelectionContainer from './grid_selection_container';
import GridSelectionGroupContainer from './grid_selection_group_container';



export default class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.removeSelecting = this.removeSelecting.bind(this);
    this.mouseAction = this.mouseAction.bind(this);
    this.mouseOver = this.mouseOver.bind(this);
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
    const rowHeads = new Array(this.props.grid.length);
    for(let i = 0; i < rowHeads.length; i++) {

      const head = {
        content: `${i+1}`,
        size: this.props.grid[i][0].height
      }

      rowHeads[i] = head
    }
    return rowHeads;
  }

  colHeads() {
    const columnHeads = new Array(this.props.grid[0].length);

    for(let i = 0; i < columnHeads.length; i++) {
      const head = {
        content: numToChar(i+1),
        size: this.props.grid[0][i].width
      }
      columnHeads[i] = head;
    }

    return columnHeads;
  }

  mouseAction(e) {
    let node = e.target
    while(node.parentNode !== null && node.id === "") {
      node = node.parentNode;
    }

    if(node.id === "")
      return false;

    const coord = parseCoord(node.id);
    const {receiveStartCell, receiveEndCell, updateRangeGroups} = this.props;

    if(!coord) {
      receiveEndCell(null);
      return false;
    }

    e.stopPropagation();

    const cell = this.props.grid[coord.start.row][coord.start.col];

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

    const coord = parseCoord(e.target.id);

    if(!coord)
      return false;

    e.stopPropagation();

    const cell = this.props.grid[coord.start.row][coord.start.col];
    if(this.props.selecting) {
      tempEndCell(cell);
    }

  }

  render() {
    const rows = this.props.grid.map((row, idx) => {
      return (
        <GridRow key={idx} rowId={idx} row={row} />
      );
    });

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
          onMouseDown={this.mouseAction}
          onMouseUp={this.mouseAction}
          onMouseOver={this.mouseOver}
          >
          <GridSelectionContainer />
          <GridSelectionGroupContainer />
          {rows}
        </section>
      </section>
    );
  }
}
