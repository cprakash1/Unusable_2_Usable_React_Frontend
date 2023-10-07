import React from "react";
import Carousel from "react-bootstrap/Carousel";

const CrouselShow = ({ camp }) => {
  return (
    <Carousel data-bs-theme="dark">
      {camp
        ? camp.map((im, id) => {
            return (
              <Carousel.Item key={id}>
                <img
                  className="d-block w-100"
                  src={im.url}
                  alt="First slide"
                  style={{ width: "20vw", height: "50vh" }}
                />
              </Carousel.Item>
            );
          })
        : null}
    </Carousel>
  );
};

export default CrouselShow;
