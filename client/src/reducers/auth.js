import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../actions/types";

const intialState = {
  token: localStorage.getItem("token"),
  isAuthinticated: null,
  loading: true,
  user: null,
};
export default function (state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthinticated: true,
        loading: false,
      };
      break;
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthinticated: false,
        loading: false,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthinticated: true,
        loading: false,
        user: payload,
      };

    default:
      return state;
  }
}
