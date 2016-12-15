export const fetchGroups = (success, error) => {
  return $.ajax({
    method: "GET",
    url: `/api/groups`,
    success,
    error
  });
};

export const saveGroup = (group, success, error) => {
  return $.ajax({
    method: "PATCH",
    url: `/api/group/${group.id}`,
    data: group,
    success,
    error
  });
}

export const createGroup = (group, success, error) => {
  return $.ajax({
    method: "POST",
    url: `/api/groups`,
    data: group,
    success,
    error
  });
}
