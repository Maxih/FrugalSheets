import React from 'react';

export default class UserBadge extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showBadge: false
    }

    this.toggleBadge = this.toggleBadge.bind(this);
  }


  toggleBadge() {
    this.setState({showBadge: !this.state.showBadge});
  }

  render() {
    const {currentUser} = this.props;

    if(currentUser === null || currentUser === undefined)
      return (<span></span>);


    const badgeDropdown = (
      <div className="user-badge-dropdown">
        <span className="user-name">
          {`${currentUser.firstname} ${currentUser.lastname}`}
        </span>
        <span className="user-email">
          {currentUser.email}
        </span>
        <span className="user-logout">
          <button onClick={this.props.logOut}>Sign out</button>
        </span>
      </div>
    );

    return (
      <div className="user-badge">
        <span className={this.state.showBadge ? "badge active-badge" : "badge"} onClick={this.toggleBadge}>{currentUser.firstname[0]}</span>
        {this.state.showBadge ? badgeDropdown : ""}
      </div>
    )
  }
};
