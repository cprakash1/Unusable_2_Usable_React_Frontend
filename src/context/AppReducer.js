export default (state, action) => {
  switch (action.type) {
    case "GET_CAMPGROUNDS":
      return {
        ...state,
        campgrounds: action.payload,
        loading: false,
      };
    case "CAMPGROUND_ERROR":
      return {
        ...state,
        error: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.id,
        loading: false,
      };
    case "POST_CAMPGROUND":
      return {
        ...state,
        campgrounds: [...state.campgrounds, action.payload],
        loading: false,
      };
    case "UPDATE_CAMPGROUND":
      return {
        ...state,
        campgrounds: state.campgrounds.map((campground) =>
          campground._id === action.payload._id ? action.payload : campground
        ),
        loading: false,
      };
    case "DELETE_CAMPGROUND":
      return {
        ...state,
        campgrounds: state.campgrounds.filter(
          (campground) => campground._id !== action.payload
        ),
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        loading: false,
      };
    case "CREATE_REVIEW":
      return {
        ...state,
        campgrounds: state.campgrounds.map((campground) =>
          campground._id === action.payload._id ? action.payload : campground
        ),
        loading: false,
      };
    case "DELETE_REVIEW":
      return {
        ...state,
        campgrounds: state.campgrounds.map((campground) =>
          campground._id === action.payload._id ? action.payload : campground
        ),
        loading: false,
      };
    case "DELETE_SUCCESS":
      return {
        ...state,
        success: null,
      };
    case "DELETE_ERROR":
      return {
        ...state,
        error: null,
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };
  }
};
