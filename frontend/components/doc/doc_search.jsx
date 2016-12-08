import React from 'react';

export default class DocSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParam: ""
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({searchParam: e.target.value});
    this.props.filterDocuments(e.target.value);
  }

  render() {
    return (
      <div className="document-search">
        <input type="text" placeholder="Search" value={this.state.searchParam} onChange={this.onChange} />
      </div>
    );
  }
}
