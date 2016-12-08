import React from 'react';
import {newSheetName} from '../../utils/grid_utils';

export default class SheetNav extends React.Component {
  constructor() {
    super();

    this.addSheet = this.addSheet.bind(this);
  }

  addSheet() {
    const {addSheet} = this.props;

    const names = this.props.sheetNames.map((sheet) => {
      return sheet.id;
    });


    const newName = newSheetName(names);

    addSheet(newName);
  }

  changeSheet(sheetName) {
    const {changeActiveSheet} = this.props;
    changeActiveSheet(sheetName);
  }

  render() {
    const sheets = this.props.sheetNames.map((sheet, idx) => {
      if(sheet.id === this.props.activeSheet) {
        return (
          <li className="active-sheet" key={idx}>{sheet.name}</li>
        );
      }

      return (
        <li key={idx} onClick={this.changeSheet.bind(this, sheet.id)}>{sheet.name}</li>
      );
    });

    return (
      <ul>
        <li className="sheet-nav-special" onClick={this.addSheet}>+</li>
        {sheets}
      </ul>
    );
  }
}
