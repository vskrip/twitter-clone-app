import { twittConstants } from "../_constants";
import { twittService } from "../_services";

export const twittActions = {
  getAllTwitts,
};

function getAllTwitts() {
  return (dispatch) => {
    dispatch(request());

    twittService.getAllTwitts().then(
      (twitts) => dispatch(success(twitts)),
      (error) => dispatch(failure(error.toString()))
    );
  };

  function request() {
    return { type: twittConstants.GETALL_REQUEST };
  }
  function success(twitts) {
    return { type: twittConstants.GETALL_SUCCESS, twitts };
  }
  function failure(error) {
    return { type: twittConstants.GETALL_FAILURE, error };
  }
}
