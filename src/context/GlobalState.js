import React, { useReducer, createContext } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:80", // Replace with your API base URL
  timeout: 60000, // Set a default timeout (optional)
});

const initialState = {
  campgrounds: [],
  error: null,
  loading: true,
  user: null,
};

//creating context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();

  //actions

  // GET ALL CAMPGROUNDS
  async function getCampgrounds() {
    if (state.campgrounds.length !== 0) {
      return;
    }
    try {
      const res = await axiosInstance.get("/items");
      // console.log(res.response.data);
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "GET_CAMPGROUNDS",
          payload: res.data.items,
        });
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      // console.log(err);
      navigate("/");
    }
  }

  // LOGIN
  async function login(obj) {
    if (state.user !== null) {
      navigate("/items");
    }
    try {
      const res = await axiosInstance.post("/login", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
        navigate("/items");
      }
    } catch (err) {
      dispatch({
        type: "LOGIN_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      navigate("/login");
    }
  }

  // GET A CAMPGROUND
  async function getACampground(id) {
    try {
      const res = await axiosInstance.get(`/items/${id}`);
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        return res.data.item;
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      navigate("/items");
    }
  }

  // LOGOUT
  function logout() {
    dispatch({
      type: "LOGOUT",
    });
  }

  // POST A CAMPGROUND
  async function postACampground(obj) {
    try {
      obj.user = state.user;
      const formData = new FormData();
      for (const image of obj.images) {
        formData.append("image", image);
      }
      formData.append("title", obj.title);
      formData.append("location", obj.location);
      formData.append("price", obj.price);
      formData.append("description", obj.description);
      formData.append("user", state.user);

      const res = await axiosInstance.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "POST_CAMPGROUND",
          payload: res.data.item,
        });
        navigate(`/items/${res.data.item._id}`);
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      navigate("/items/new");
    }
  }

  // Update a Campground
  async function updateACampground(obj) {
    try {
      const formData = new FormData();
      for (const image of obj.images) {
        formData.append("image", image);
      }
      formData.append("deleteimage", JSON.stringify(obj.deleteimage));
      formData.append("title", obj.title);
      formData.append("location", obj.location);
      formData.append("price", obj.price);
      formData.append("description", obj.description);
      formData.append("user", state.user);
      formData.append("id", obj.id);

      const res = await axiosInstance.put(`/items/${obj.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "UPDATE_CAMPGROUND",
          payload: res.data.item,
        });
        navigate(`/items/${obj.id}`);
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err,
      });
      console.log(err);
      navigate(`/items/${obj.id}`);
    }
  }

  // DELETE A CAMPGROUND
  async function deleteACampground(id, author) {
    try {
      if (state.user !== author._id) {
        navigate("/items/" + id);
        return;
      }
      const res = await axiosInstance.delete(`/items/${id}`);
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "DELETE_CAMPGROUND",
          payload: id,
        });
        navigate("/items");
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      navigate(`/items/${id}`);
    }
  }

  // CREATE A REVIEW
  async function createAReview(id, obj) {
    try {
      const res = await axiosInstance.post(`/items/${id}/reviews`, obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "CREATE_REVIEW",
          payload: res.data.item,
        });
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      navigate(`/items/${id}`);
    }
  }

  //DELETE A REVIEW
  async function deleteAReview(id, reviewId) {
    try {
      const res = await axiosInstance.delete(
        `/items/${id}/reviews/${reviewId}`
      );
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "DELETE_REVIEW",
          payload: res.data.item,
        });
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      navigate(`/items/${id}`);
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        campgrounds: state.campgrounds,
        error: state.error,
        loading: state.loading,
        user: state.user,
        getCampgrounds,
        login,
        getACampground,
        logout,
        postACampground,
        updateACampground,
        deleteACampground,
        createAReview,
        deleteAReview,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
