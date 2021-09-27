import { GET_USERS } from "../actions/types";

const intialState = {
  users: [],
  loading: true,
};

export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
      break;

    default:
      return state;
  }
}
