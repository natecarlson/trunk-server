import axios from 'axios';
//import { browserHistory } from "react-router"
import * as types from "./sources-constants";
import { push } from 'connected-react-router';

function beginFetchSources() {
  return { type: types.FETCH_SOURCES };
}

function fetchSourcesSuccess(data) {
  return { type: types.FETCH_SUCCESS_SOURCES,
  data };
}

function fetchSourcesError(data) {
  return { type: types.FETCH_ERROR_SOURCES,
  data };
}


function shouldFetchSources(state, shortName) {
  if (!state.sources.items.hasOwnProperty(shortName)) {
    return true
  } else if (state.sources.isWaiting) {
    return false
  } else {
    return false
  }
}

export function fetchSources(shortName) {
  return (dispatch, getState) => {
    if (shouldFetchSources(getState(), shortName)) {
    dispatch(beginFetchSources());

    return axios
      .get(backend_server + "/" + shortName + "/sources")
      .then(response => {
        if (response.data) {
          var data = { shortName: shortName, sources: response.data.sources }
          dispatch(fetchSourcesSuccess(data));
        } else {
          dispatch(fetchSourcesError());
          let registerMessage = response.data.message;
          return registerMessage;
        }
      })
      .catch(response => {
        if (response instanceof Error) {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", response.message);
        }
      });
  };
};
}
