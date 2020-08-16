import { twittConstants } from "../_constants";
import { twittService } from "../_services";
import { alertActions } from "./";
import { history } from "../_helpers";

export const twittActions = {
  getAllTwitts,
  create,
  update,
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

function create(twitt) {
  return (dispatch) => {
    dispatch(request(twitt));

    twittService.create(twitt).then(
      (twitt) => {
        dispatch(success(twitt));
        history.push("/twitts");
        dispatch(alertActions.success("Posted successful"));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(twitt) {
    return { type: twittConstants.CREATE_REQUEST, twitt };
  }
  function success(twitt) {
    return { type: twittConstants.CREATE_SUCCESS, twitt };
  }
  function failure(error) {
    return { type: twittConstants.CREATE_FAILURE, error };
  }
}

function update(twitt) {
  return (dispatch) => {
    dispatch(request(twitt));

    twittService.update(twitt).then(
      (twitt) => {
        dispatch(success(twitt));
        dispatch(alertActions.success("Twitt updated successfully."));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(twitt) {
    return { type: twittConstants.UPDATE_REQUEST, twitt };
  }
  function success(twitt) {
    return { type: twittConstants.UPDATE_SUCCESS, twitt };
  }
  function failure(error) {
    return { type: twittConstants.UPDATE_FAILURE, error };
  }
}
