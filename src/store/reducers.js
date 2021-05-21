import {
  LOADDATA,
  CHANGE_SIDE_NAV_STATE,
  CHANGE_LOADING_STATE,
  CLEAN_DATA,
  LOADMORE,
  LOAD_DETAIL_PAGE,
  SAVE_PATH_NAME,
  SHOW_TRAILER,
  CLEAR_DETAIL
} from "./actions";

let initialState = {
  movies: [],
  loading: false,
  currentPage: 0,
  totalPages: 0,
  searchTerm: "",
  showSideNav: false,
  movieDetail: null,
  casts: null,
  trailerKey: "",
  isDetail: false,
  recommendations: null,
  pathName: null,
  showTrailer: false
};

let reducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOADDATA:
      return {
        ...newState,
        movies: action.movies,
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        loading: action.loading,
        totalResults: action.totalResults
      };
    case LOADMORE:
      return {
        ...newState,
        movies: [...newState.movies, ...action.movies],
        currentPage: action.currentPage,
        totalPages: action.totalPages,
        loading: action.loading,
        totalResults: action.totalResults
      };
    case CHANGE_LOADING_STATE:
      return {
        ...newState,
        loading: !newState.loading
      };
    case CHANGE_SIDE_NAV_STATE:
      return {
        ...newState,
        showSideNav: !newState.showSideNav
      };
    case CLEAN_DATA:
      return {
        ...newState,
        movies: [],
        currentPage: 0,
        totalPages: 0,
        searchTerm: "",
        showSideNav: false,
        movieDetail: null,
        casts: null,
        trailerKey: "",
        isDetail: false,
        recommendations: null
      };
    case LOAD_DETAIL_PAGE:
      return {
        ...newState,
        movies: [...action.recommendations],
        casts: action.casts,
        trailerKey: action.trailerKey,
        isDetail: action.isDetail,
        movieDetail: action.movieDetail,
        loading: !state.loading
      };
    case SAVE_PATH_NAME:
      return {
        ...newState,
        pathName: action.pathName
      };
    case SHOW_TRAILER:
      return {
        ...newState,
        showTrailer: !state.showTrailer
      };
    case CLEAR_DETAIL:
      return {
        ...newState,
        isDetail: false
      };

    default:
      return newState;
  }
};

export default reducer;
