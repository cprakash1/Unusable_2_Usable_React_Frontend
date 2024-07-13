import React, { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import AppReducer from "./AppReducer";
import { useNavigate } from "react-router-dom";
import socket from "./socket";

const axiosInstance = axios.create({
  baseURL: "http://127.0.0.1:80", // Replace with your API base URL
  // baseURL: "https://unusable-2-usable-react-backend.onrender.com", // Replace with your API base URL
  // baseURL: process.env.REACT_APP_BASE_URL, // Replace with your API base URL
  timeout: 60000, // Set a default timeout (optional)
});

const initialState = {
  campgrounds: [],
  error: null,
  loading: false,
  user: null,
  success: null,
};

//creating context
export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const navigate = useNavigate();
  useEffect(() => {
    console.log(state.user);
  }, [state.user]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("disconnect", () => {
      console.log("disconnected");
    });
    socket.on("campgroundsChanged", () => {
      getCampgrounds();
    });
    socket.on("Run", () => {
      console.log("RUN");
    });
    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("campgroundsChanged");
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  //actions

  function deleteError() {
    dispatch({
      type: "DELETE_ERROR",
    });
  }

  function deleteSuccess() {
    dispatch({
      type: "DELETE_SUCCESS",
    });
  }

  function deleteLoading() {
    dispatch({
      type: "DELETE_LOADING",
    });
  }

  function setLoading() {
    dispatch({
      type: "SET_LOADING",
    });
  }

  // GET ALL CAMPGROUNDS
  async function getCampgrounds() {
    if (state.campgrounds.length !== 0) {
      return;
    }
    try {
      // setLoading();
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
        localStorage.setItem("access_token", res.data.access_token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
        dispatch({
          type: "SET_SUCCESS",
          payload: "Login Successfull",
        });
        navigate("/items");
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(state.error, err.response.data.error);
      console.log(err);
      navigate("/login");
    }
  }

  // GET A CAMPGROUND
  async function getACampground(id) {
    try {
      setLoading();
      const res = await axiosInstance.get(`/items/${id}`);
      deleteLoading();
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
    localStorage.removeItem("access_token");
    dispatch({
      type: "LOGOUT",
    });
    dispatch({
      type: "SET_SUCCESS",
      payload: "LogOut Successfull",
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

      setLoading();
      const res = await axiosInstance.post("/items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      deleteLoading();
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "POST_CAMPGROUND",
          payload: res.data.item,
        });
        dispatch({
          type: "SET_SUCCESS",
          payload: "Campground Added Successfully",
        });
        navigate(`/items/${res.data.item._id}`);
        socket.emit("campgroundsChanged");
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

      setLoading();
      const res = await axiosInstance.put(`/items/${obj.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      deleteLoading();
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "UPDATE_CAMPGROUND",
          payload: res.data.item,
        });
        dispatch({
          type: "SET_SUCCESS",
          payload: "Campground Updated Successfully",
        });
        navigate(`/items/${obj.id}`);
        socket.emit("campgroundsChanged");
        socket.emit("singleCampgroundChanged", obj.id);
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
      setLoading();
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
        dispatch({
          type: "SET_SUCCESS",
          payload: "Campground Deleted Successfully",
        });
        navigate("/items");
        socket.emit("campgroundsChanged");
        socket.emit("singleCampgroundChanged", id);
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
        dispatch({
          type: "SET_SUCCESS",
          payload: "Review Added Successfully",
        });
        socket.emit("singleCampgroundChanged", id);
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
        dispatch({
          type: "SET_SUCCESS",
          payload: "Review Deleted Successfully",
        });
        socket.emit("singleCampgroundChanged", id);
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

  //Set user from access token
  async function setUserFromAccessToken() {
    if (state.user || localStorage.getItem("access_token") === null) {
      return;
    }
    try {
      const data = { access_token: localStorage.getItem("access_token") };
      const res = await axiosInstance.post("/getuser", data, {
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
        // dispatch({
        //   type: "SET_SUCCESS",
        //   payload: "Successfully Loaded Previous Session",
        // });
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      localStorage.removeItem("access_token");
      navigate(`/login`);
    }
  }

  async function getRegisterToken(obj) {
    try {
      const res = await axiosInstance.post("/registerToken", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "SET_SUCCESS",
          payload: "Registration Token Sent Successfully",
        });
        return res.data.registerToken;
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      window.location.reload();
    }
  }

  async function register(obj) {
    try {
      const res = await axiosInstance.post("/register", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        localStorage.setItem("access_token", res.data.access_token);
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: res.data,
        });
        dispatch({
          type: "SET_SUCCESS",
          payload: "Registration Successfull and Logging You In...",
        });
        navigate("/items");
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      window.location.reload();
    }
  }

  async function forgotPasswordToken(obj) {
    try {
      const res = await axiosInstance.post("/forgotPasswordToken", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "SET_SUCCESS",
          payload: "Password Reset Token Sent Successfully",
        });
        return res.data.forgotPasswordToken;
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      window.location.reload();
    }
  }

  const forgotPassword = async (obj) => {
    try {
      const res = await axiosInstance.post("/forgotPassword", obj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
      if (res.data.success === false) {
        throw new Error(res.data.message);
      } else {
        dispatch({
          type: "SET_SUCCESS",
          payload: "Password Reset Successfully",
        });
        navigate("/login");
      }
    } catch (err) {
      dispatch({
        type: "CAMPGROUND_ERROR",
        payload: err.response.data.error,
      });
      console.log(err);
      window.location.reload();
    }
  };

  function setSuccess(message) {
    dispatch({
      type: "SET_SUCCESS",
      payload: message,
    });
  }

  function setError(message) {
    dispatch({
      type: "CAMPGROUND_ERROR",
      payload: message,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        campgrounds: state.campgrounds,
        error: state.error,
        loading: state.loading,
        user: state.user,
        success: state.success,
        getCampgrounds,
        login,
        getACampground,
        logout,
        postACampground,
        updateACampground,
        deleteACampground,
        createAReview,
        deleteAReview,
        setUserFromAccessToken,
        getRegisterToken,
        register,
        forgotPasswordToken,
        forgotPassword,
        deleteError,
        deleteSuccess,
        setError,
        setSuccess,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
