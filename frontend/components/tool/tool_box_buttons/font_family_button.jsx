import React from 'react';

String.prototype.trunc = String.prototype.trunc ||
      function(n){
          return (this.length > n) ? this.substr(0,n-1)+'...' : this;
      };

export default class FontFamilyButton extends React.Component {
  constructor() {
    super();

    this.state = {
      pickingFamily: false
    }

    this.families = ["Arial","Tahoma","sans-serif","Comic Sans MS"];

    this.toggleFamilyPicker = this.toggleFamilyPicker.bind(this);
  }

  toggleFamilyPicker() {
    this.setState({pickingFamily: !this.state.pickingFamily});
  }

  selectFamily(family) {
    this.props.changeStyle("fontFamily", family);
    this.setState({pickingFamily: false});
  }

  renderDropDown() {
    const options = this.families.map((family) => {
      const style = {fontFamily: family};
      return (
        <li key={family} style={style} onClick={this.selectFamily.bind(this, family)}>{family}</li>
      );
    });

    return (
      <ul className="fontsize-dropdown">
        {options}
      </ul>
    );
  }

  render() {
    const style = this.props.family.fontFamily ? {fontFamily: this.props.family.fontFamily} : {};
    return (
        <li
          style={style}
          className={this.state.pickingFamily ? "style-group-item style-type-fontfamily active-style" : "style-group-item style-type-fontfamily"}
          onClick={this.toggleFamilyPicker}>
          {this.props.family.fontFamily ? this.props.family.fontFamily.trunc(10) : "Arial"}
          {this.state.pickingFamily ? this.renderDropDown() : ""}
          <span className="dropdown-arrow"></span>
        </li>
    )
  }
}
