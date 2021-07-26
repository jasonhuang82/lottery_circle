import { SET_WINNER_INFO } from "./types";
export const setWinnerInfo = (person) => {
  return {
    type: SET_WINNER_INFO,
    person,
  };
}


export default {
  setWinnerInfo,
};
