import * as actions from "./actionTypes";

export function userStored(email, password) {
  console.log("user stored");
  return {
    type: actions.USER_STORED,
    payload: {
      email,
      password,
      isLoggedIn: true,
    },
  };
}

export function userUpdated(email, password) {
  console.log("user updates");
  return {
    type: actions.USER_UPDATED,
    payload: {
      email,
      password,
    },
  };
}

export function showStatus(status, message) {
  return {
    type: actions.SHOW_STATUS,
    payload: {
      message,
      status,
    },
  };
}
