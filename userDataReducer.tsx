import { Constant } from "../utils";

export const INITIAL_STATE = {
  is_token_saved: null,
  data: {},
};

const UserDataReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Constant.SAVE_TOKEN:
      return {
        ...state,
        is_token_saved: action.payload,
      };
    case Constant.ADS_DATA:
      return {
        ...state,
        data: action.payload,
      };
    case Constant.SAVE_SPORT_DATA:
      return {
        ...state,
        is_sport_data: action.payload,
      };
    default:
      return state;
  }
};
export default UserDataReducer;
