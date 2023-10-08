import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalState";

const Edit = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [image, setImage] = useState([]);
  const [deleteimage, setDeleteimage] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { getACampground, updateACampground, user, setError } =
    useContext(GlobalContext);
  useEffect(() => {
    getACampground(id).then((item) => {
      if (user !== item.author._id) {
        setError("You are not authorized to edit this item!");
        navigate(`/items/${id}`);
      }
      setTitle(item.title);
      setLocation(item.location);
      setPrice(item.price);
      setDescription(item.description);
      setImage(item.image);
    });
  }, []);
  return (
    <div>
      <div className="row">
        <h1 className="text-center">Edit Item</h1>
        <div className="col-6 offset-3 mb-4">
          <form
            action={"/items/" + id}
            method="post"
            className="form mb-4 needs-validation"
            noValidate
            // enctype="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={title}
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
            <div className="mb-3">
              {/* <!-- <label htmlFor="image" className="form-label">image</label>
          <input type="text" name="image" id="image" className="form-control" value="<%= item.image %>" required>
          <div className="valid-feedback">
            Looks good!
          </div>
          <div className="invalid-feedback">
            Please provide a valid data.
          </div> --> */}
              <input
                type="file"
                name="image"
                id="image"
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
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">
                Please provide a valid data.
              </div>
            </div>
            <div>
              {image.map((value, id) => {
                return (
                  <div className="block" key={id}>
                    <img
                      src={value.url}
                      alt={value}
                      className="img-thumbnail block"
                    />
                    <div className="form-check-inline">
                      <input
                        type="checkbox"
                        name="deleteimage[]"
                        id={"imag-" + id}
                        onChange={(e) => {
                          e.target.checked
                            ? setDeleteimage([...deleteimage, value])
                            : setDeleteimage(
                                deleteimage.filter((val) => {
                                  return val !== value;
                                })
                              );
                        }}
                        value="<%= value.filename %>"
                      />
                    </div>
                    <label htmlFor={"imag-" + id}>Delete? </label>
                  </div>
                );
              })}
            </div>
            <button
              className="btn btn-info"
              onClick={(e) => {
                e.preventDefault();
                updateACampground({
                  id,
                  title,
                  location,
                  price,
                  description,
                  image,
                  images,
                  deleteimage,
                });
              }}
            >
              Update Item
            </button>
          </form>
          <Link to={"/items/" + id}>BACK</Link>
        </div>
      </div>
    </div>
  );
};

export default Edit;
