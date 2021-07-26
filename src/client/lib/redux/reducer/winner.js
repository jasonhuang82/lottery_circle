import { SET_WINNER_INFO } from "../action/types";
const initialState = {
  id: "",
  name: {
    last: "",
    first: "",
  },
  picture: {
    large: "",
    medium: "",
    thumbnail: "",
  },
  nat: "",
  email: "",
  phone: "",
  gender: "",
};
const winner = (state = initialState, action) => {
  switch (action.type) {
    case SET_WINNER_INFO:
      return {
        ...state,
        ...action.person,
      }
    default:
      return state
  }
};

export default winner;
