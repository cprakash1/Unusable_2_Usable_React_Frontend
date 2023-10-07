import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import { Link } from "react-router-dom";

const Home = () => {
  const { campgrounds, getCampgrounds } = useContext(GlobalContext);
  getCampgrounds();
  return (
    <div className="container">
      {/* <div id="map" style={{ width: "100%", height: "500px" }}></div> */}
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-center">Unusable2Usable !!!</h1>
      <br />
      <br />
      {/* <!-- <a href="/campground/new">Add campground</a> --> */}
      <div className="input-group">
        <input
          type="search"
          id="search-input"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
        />
        <button
          type="button"
          className="btn btn-outline-primary"
          id="search-button"
        >
          search
        </button>
      </div>

      <br />
      <br />
      <div id="cp">
        {campgrounds.map((c, id) => {
          return (
            <div className="card mb-3" key={id}>
              <div className="row">
                <div className="col-md-4">
                  {c.image.length === 0 ? (
                    <img
                      className="img-fluid img-thumbnail"
                      src="https://res.cloudinary.com/dhtxywza0/image/upload/w_400,h_300/v1684793983/YelpCamp/bqlyxwcqzivezngcbwic.jpg"
                      alt=""
                    />
                  ) : (
                    <img
                      className="img-fluid img-thumbnail"
                      src={c.image[0].url}
                      alt=""
                    />
                  )}
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{c.title} </h5>
                    <br />
                    <h3 className="card-title">$ {c.price} </h3>
                    <br />
                    <p className="card-text text-muted">
                      Location: {c.location}{" "}
                    </p>
                    <Link className="btn btn-primary" to={"/items/" + c.id}>
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
