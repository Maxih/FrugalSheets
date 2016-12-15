import React from 'react';

const GroupSelector = (props) => {
  let groups = Object.values(props.list)

  groups = groups.map((group) => {
    let className = "";

    if(props.active === group.id) {
      className = "active-group";
    }

    return (
      <li onClick={() => props.selectGroup(group.id)} className={className} key={group.id}>
        {group.name}
      </li>
    );
  });

  return (
    <div className="group-list-wrapper">
      <span className="group-list-title">Shared by:</span>
      <ul className="group-list">
        {groups}
      </ul>
    </div>
  );
}

export default GroupSelector;
