import React from 'react';
import {numToChar, between, blankSheet, parseCoord} from '../../utils/grid_utils';
import GridRow from './grid_row';
import GridHeader from './grid_header';
import GridSelectionContainer from './grid_selection_container';
import GridSelectionGroupContainer from './grid_selection_group_container';
import {Formula} from '../../utils/formula_util';



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
    let rows = [];
    for(let i = 0; i < this.props.rows; i++) {
      rows.push({
        content: `${i+1}`,
        size: this.props.colSizes[i+1] || 26
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
        size: this.props.rowSizes[colId] || 100
      });
    }
    return cols;
  }

  mouseAction(e) {
    let node = e.target
    while(node.parentNode !== null && node.id === "") {
      node = node.parentNode;
    }

    if(node.id === "")
      return false;

    const cell = this.props.cells[node.id];

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

    const cell = this.props.cells[e.target.id];

    if(cell === undefined)
      return false;

    e.stopPropagation();

    if(this.props.selecting) {
      tempEndCell(cell);
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
