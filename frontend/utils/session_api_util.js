export const signup = (user, success, error) => {
  return $.ajax({
    method: "POST",
    url: "/api/users",
    data: user,
    success,
    error
  });
};

export const login = (user, success, error) => {
  return $.ajax({
    method: "POST",
    url: "/api/session",
    data: user,
    success,
    error
  });
};

export const logout = (success, error) => {
  return $.ajax({
    method: "DELETE",
    url: "/api/session",
    success,
    error
  });
};
