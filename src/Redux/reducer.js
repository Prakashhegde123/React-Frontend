import * as actions from "./actionTypes";

const initialStateUser = {
  email: "username@domail.com",
  password: "password",
  isLoggedIn: false,
};
const initialStateWindow = {
  message: "",
  status: "",
};

export function reducer(state = initialStateUser, action) {
  switch (action.type) {
    case actions.USER_STORED:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        isLoggedIn: action.payload.isLoggedIn,
      };
    case actions.USER_UPDATED:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };

    default:
      return state;
  }
}

export function windowReducer(state = initialStateWindow, action) {
  switch (action.type) {
    case actions.SHOW_STATUS:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
      };

    default:
      return state;
  }
}
