import axios from "axios";
export const LOADDATA = "LOADDATA";
export const CHANGE_SIDE_NAV_STATE = "CHANGE_SIDE_NAV_STATE";
export const CHANGE_LOADING_STATE = "CHANGE_LOADING_STATE";
export const CLEAN_DATA = "CLEAN_DATA";
export const LOADMORE = "LOADMORE";
export const LOAD_DETAIL_PAGE = "LOAD_DETAIL_PAGE";
export const SAVE_PATH_NAME = "SAVE_PATH_NAME";
export const SHOW_TRAILER = "SHOW_TRAILER";
export const CLEAR_DETAIL = "CLEAR_DETAIL";

export function fetchData(endpoint) {
  return async dispatch => {
    let response = await axios(endpoint);
    console.log(response);
    dispatch(fetchDataSucess(response.data));
  };
}

export function fetchDataSucess(data, method = "normal") {
  let type;
  if (method === "normal") {
    // when access the url refresh the movies data to store new one
    type = LOADDATA;
  } else if (method === "loadmore") {
    // load more action...retaining the old movies data
    type = LOADMORE;
  }
  const { results, page, total_pages, total_results } = data;
  return {
    type,
    movies: results,
    currentPage: page,
    totalPages: total_pages,
    loading: false,
    totalResults: total_results
  };
}

export function changeSideNavState() {
  return {
    type: CHANGE_SIDE_NAV_STATE
  };
}

export function changeLoadingState() {
  return {
    type: CHANGE_LOADING_STATE
  };
}

export function loadMore(endpoint) {
  return dispatch => {
    axios(endpoint).then(res => {
      dispatch(fetchDataSucess(res.data, "loadmore"));
    });
  };
}

export function search(endpoint) {
  return dispatch => {
    axios(endpoint).then(res => {
      dispatch(fetchDataSucess(res.data));
    });
  };
}

export function cleanData() {
  return {
    type: CLEAN_DATA
  };
}

export function clearDetail() {
  return {
    type: CLEAR_DETAIL
  };
}

export function loadDetailPage(
  movieDetail,
  casts,
  trailerKey,
  isDetail,
  recommendations
) {
  // change loading state
  return {
    type: LOAD_DETAIL_PAGE,
    movieDetail,
    casts,
    trailerKey,
    isDetail,
    recommendations
  };
}

export function savePathName(pathName) {
  return {
    type: SAVE_PATH_NAME,
    pathName: pathName
      .split("/")
      .slice(0, 2)
      .join("/")
  };
}

export function showTrailerModal() {
  return {
    type: SHOW_TRAILER
  };
}
