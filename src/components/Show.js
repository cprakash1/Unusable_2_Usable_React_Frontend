import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useParams, Link } from "react-router-dom";
import MapboxShow from "./MapboxShow";
import CrouselShow from "./CrouselShow";
import socket from "../context/socket";
import ChatBox from "./ChatBox";
import ChatBoxAdmin from "./ChatBoxAdmin";

const Show = () => {
  const {
    user,
    getACampground,
    deleteACampground,
    createAReview,
    deleteAReview,
  } = useContext(GlobalContext);
  const [camp, setCamp] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    getACampground(id).then((item) => {
      setCamp(item);
    });
  }, []);
  useEffect(() => {
    socket.on("singleCampgroundChanged", (id) => {
      if (id && camp && id === camp._id) {
        getACampground(id).then((item) => {
          setCamp(item);
        });
      }
    });
    return () => {
      // Clean up event listeners when the component unmounts
      socket.off("singleCampgroundChanged");
    };
  }, [camp]);
  const [body, setBody] = useState("");
  // console.log(camp);
  if (!camp) return null;
  return (
    <div>
      <link rel="stylesheet" href="/css/star.css" />
      <div className="row mb-4">
        <div className="col-6">
          <div className="card mb-3">
            <CrouselShow camp={camp.image} />
            {camp.image.length === 0 ? (
              <img
                className="img-fluid img-thumbnail"
                src="https://res.cloudinary.com/dhtxywza0/image/upload/w_200,h_150/v1684793983/YelpCamp/bqlyxwcqzivezngcbwic.jpg"
                alt=""
              />
            ) : null}
            <div className="card-body">
              <h5 className="card-title"> {camp.title} </h5>
              <p className="card-text"> {camp.description} </p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item text-muted"> {camp.location} </li>
              <li className="list-group-item">
                Seller : {camp.author.username}
              </li>
              <li className="list-group-item">
                <b>$ {camp.price} </b>
              </li>
            </ul>
            {user && camp.author._id === user ? (
              <div className="card-body">
                <Link
                  to={"/items/" + camp._id + "/edit"}
                  className="btn btn-info mx-2"
                >
                  EDIT
                </Link>
                <form
                  className="d-inline"
                  action="/items/<%= camp._id %>?_method=DELETE"
                  method="post"
                >
                  <button
                    className="btn btn-danger mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteACampground(camp._id, camp.author);
                    }}
                  >
                    DELETE
                  </button>
                </form>
              </div>
            ) : null}
            <div className="card-footer text-muted">2 days ago</div>
          </div>
          {user ? (
            <div className="mb-3">
              <form
                action="/items/<%= camp._id %>/reviews"
                method="post"
                className="needs-validation"
                noValidate
              >
                <br />
                <br />
                <div className="mb-3">
                  <label className="form-label" htmlFor="body">
                    <h2> Write a Review</h2>
                  </label>
                  <textarea
                    className="form-control"
                    name="review[body]"
                    id="body"
                    cols="30"
                    rows="5"
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                    }}
                    required
                  ></textarea>
                  <div className="valid-feedback">Looks good!</div>
                </div>
                <button
                  className="btn btn-success"
                  onClick={async (e) => {
                    e.preventDefault();
                    await createAReview(id, { body, user });
                    await getACampground(id).then((item) => {
                      setCamp(item);
                    });
                    setBody("");
                  }}
                >
                  Submit
                </button>
              </form>
            </div>
          ) : null}
          <br />
          <br />
          <div
            className="mb-3"
            style={
              user && camp.reviews && camp.reviews.length > 3
                ? {
                    overflowY: "scroll",
                    height: "400px",
                    scrollbarWidth: "thin",
                  }
                : null
            }
          >
            {camp.reviews.map((c, index) => {
              if (user) {
                return (
                  <div className="card mb-3" key={index}>
                    <div className="card-body">
                      <h5 className="card-title">
                        <b>User: {c.author.username} </b>
                      </h5>
                      <p className="card-text">Reviews: {c.body} </p>
                      {user && c.author._id === user ? (
                        <form
                          action="/items/<%= camp._id %>/reviews/<%= c._id %>?_method=DELETE"
                          method="post"
                        >
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={async (e) => {
                              e.preventDefault();
                              await deleteAReview(camp._id, c._id);
                              await getACampground(id).then((item) => {
                                setCamp(item);
                              });
                            }}
                          >
                            Delete
                          </button>
                        </form>
                      ) : null}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className="col-6">
          <div className="mt-3">
            <MapboxShow camp={camp} />
          </div>
          <br />
          <br />
          {user &&
            (camp.author._id !== user ? (
              <ChatBox author={camp.author} campId={id} camp={camp} />
            ) : (
              <>
                <ChatBoxAdmin campId={id} author={camp.author} camp={camp} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Show;
