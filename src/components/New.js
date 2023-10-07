import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate, Link } from "react-router-dom";

const New = () => {
  const { user, postACampground } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user === null) {
      navigate("/login");
    }
  }, []);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  return (
    <div>
      <div className="row">
        <h1 className="text-center">New Item</h1>
        <div className="col-6 offset-3 mb-4">
          <form
            action="/items"
            method="post"
            className="mb-3 needs-validation"
            noValidate
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Item Name
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">
                Please provide a valid data.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Locations
              </label>
              <input
                type="text"
                name="location"
                id="title"
                className="form-control"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">
                Please provide a valid data.
              </div>
            </div>
            {/* <!-- <div className="mb-3">
                <label htmlFor="image" className="form-label">image</label>
                <input type="text"  name="image" id="image" className="form-control" required>
                <div className="valid-feedback">
                    Looks good!
                  </div>
                  <div className="invalid-feedback">
                    Please provide a valid data.
                  </div>
            </div> --> */}
            <div className="mb-3">
              <input
                type="file"
                name="image"
                id=""
                multiple
                onChange={(e) => {
                  setImages([...e.target.files]);
                }}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                price
              </label>
              <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  $
                </span>
                <input
                  type="text"
                  className="form-control"
                  id="price"
                  name="price"
                  placeholder="0.00"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">
                Please provide a valid data.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">
                Please provide a valid data.
              </div>
            </div>
            <button
              className="btn btn-success"
              onClick={async (e) => {
                e.preventDefault();
                await postACampground({
                  title,
                  location,
                  images,
                  price,
                  description,
                });
                // setImage("");
                // setLocation("");
                // setPrice("");
                // setDescription("");
                // setTitle("");
              }}
            >
              Add Item
            </button>
          </form>
          <Link to="/items">BACK</Link>
        </div>
      </div>
    </div>
  );
};

export default New;
