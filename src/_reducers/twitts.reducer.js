import { twittConstants } from "../_constants";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export function twitts(state = initialState, action) {
  switch (action.type) {
    case twittConstants.GETALL_REQUEST:
      return {
        loading: true,
      };
    case twittConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.twitts,
        loading: false,
      };
    case twittConstants.GETALL_FAILURE:
      return {
        error: action.error,
      };
    default:
      return state;
  }
}
