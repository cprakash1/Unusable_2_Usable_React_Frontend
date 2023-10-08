import React, { useRef, useEffect, useContext } from "react";
import mapboxgl from "mapbox-gl";
import { GlobalContext } from "../context/GlobalState";
// import the mapbox styles
// alternatively can use a link tag in the head of public/index.html
// see https://docs.mapbox.com/mapbox-gl-js/api/
import "mapbox-gl/dist/mapbox-gl.css";

// Grab the access token from your Mapbox account
// I typically like to store sensitive things like this
// in a .env file
mapboxgl.accessToken =
  "pk.eyJ1IjoiY3ByYWthc2gxIiwiYSI6ImNsZzZpNXBpMjBkZzkzaHFyMm83OGQyN3YifQ.5BnzbS1hsEGKg95hwpbQ7Q";

const MapboxShow = ({ camp }) => {
  const mapContainer = useRef();
  useEffect(() => {
    if (camp !== null) {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: camp.geometry.coordinates, // starting position [lng, lat]
        zoom: 6,
      });
      new mapboxgl.Marker()
        .setLngLat(camp.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h3>${camp.title}</h3><p>${camp.location}</p>`
          )
        )
        .addTo(map);
    }
  }, [camp]);

  return <div ref={mapContainer} style={{ width: "100%", height: "400px" }} />;
};

export default MapboxShow;
