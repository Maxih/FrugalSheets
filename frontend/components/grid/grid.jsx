import React from 'react';
import {numToChar, between, blankSheet} from '../../utils/grid_utils';
import GridRow from './grid_row';
import GridHeader from './grid_header';


export default class Grid extends React.Component {
  constructor(props) {
    super(props);

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

  render() {

    const rows = this.props.grid.map((row, idx) => {
      return (
        <GridRow key={idx} rowId={idx} row={row} />
      );
    });

    return (
      <section className="grid-wrapper">
        <span className="grid-blank-label"></span>
        <span className="grid-column-labels">
          <GridHeader row={this.colHeads()}/>
        </span>
        <span className="grid-row-labels">
          <GridHeader row={this.rowHeads()} col={true} />
        </span>
        <section className="grid">
          {rows}
        </section>
      </section>
    );
  }
}
