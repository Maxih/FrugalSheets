import React from 'react';
import GroupSelector from './group_selector';

export default class Group extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      visible: false,
    }
  }

  componentDidMount() {
    this.props.fetchGroups().then(
      newDoc => this.setState({loading: false})
    );
  }


  mainSelector() {
    return (
      <div className="group-list-wrapper">
        <span className="group-list-title">Filter Sheets:</span>
        <ul className="group-list">
          <li className={this.props.active === -2 ? "active-group" : ""} onClick={() => this.props.selectGroup(-2)}>
            All
          </li>
          <li className={this.props.active === -1 ? "active-group" : ""} onClick={() => this.props.selectGroup(-1)}>
            My Sheets
          </li>
        </ul>
      </div>
    );
  }


  render() {
    if(this.state.loading)
      return (<span>loading</span>);

    return (
      <section className="group-wrapper">
        {this.mainSelector()}
        <GroupSelector selectGroup={this.props.selectGroup} list={this.props.list} active={this.props.active} />

      </section>
    );
  }
}
