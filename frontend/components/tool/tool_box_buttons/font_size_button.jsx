import React from 'react';



export default class FontSizeButton extends React.Component {
  constructor() {
    super();

    this.state = {
      pickingSize: false
    }

    this.sizes = [6,7,8,9,10,11,12,14,18,24,36];

    this.toggleSizePicker = this.toggleSizePicker.bind(this);
  }

  toggleSizePicker() {
    this.setState({pickingSize: !this.state.pickingSize});
  }

  selectSize(size) {
    this.props.changeStyle("fontSize", size);
    this.setState({pickingSize: false});
  }

  renderDropDown() {
    const options = this.sizes.map((size) => {
      return (
        <li key={size} onClick={this.selectSize.bind(this, size)}>{size}</li>
      );
    });

    return (
      <ul className="fontsize-dropdown">
        {options}
      </ul>
    );
  }

  render() {
    return (
        <li
          className={this.state.pickingSize ? "style-group-item style-type-fontsize active-style" : "style-group-item style-type-fontsize"}
          onClick={this.toggleSizePicker}>
          {this.props.size.fontSize ? this.props.size.fontSize : "12"}
          {this.state.pickingSize ? this.renderDropDown() : ""}
          <span className="dropdown-arrow"></span>
        </li>
    )
  }
}
