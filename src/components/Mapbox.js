import React, { useRef, useEffect, useContext, useState } from "react";
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

const Mapbox = ({ filteredCampgrounds, setFilteredCampgrounds }) => {
  const mapContainer = useRef();
  const [callOneTime, setCallOneTime] = useState(false);

  // this is where all of our map logic is going to live
  // adding the empty dependency array ensures that the map
  // is only rendered once
  let campgroundsMap = { features: filteredCampgrounds };
  const [Map, setMap] = useState(null);
  const [styleLoaded, setStyleLoaded] = useState(false);
  // create the map and configure it
  // check out the API reference for more options
  // https://docs.mapbox.com/mapbox-gl-js/api/map/

  useEffect(() => {
    setCallOneTime(true);
  }, []);
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-103.5917, 40.6699],
      zoom: 3,
    });
    setMap(map);
    // only want to work with the map after it has fully loaded
    // if you try to add sources and layers before the map has loaded
    // things will not work properly
    if (!Map || !styleLoaded) {
      map.on("load", async () => {
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        if (map.getLayer("cluster-count")) {
          map.removeLayer("cluster-count");
        }
        if (map.getLayer("unclustered-point")) {
          map.removeLayer("unclustered-point");
        }
        if (map.getLayer("clusters")) {
          map.removeLayer("clusters");
        }
        if (map.getSource("campgrounds")) {
          map.removeSource("campgrounds");
        }
        map.addSource("campgrounds", {
          type: "geojson",
          // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
          data: campgroundsMap,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "campgrounds",
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              100,
              "#f1f075",
              750,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "campgrounds",
          filter: ["has", "point_count"],
          layout: {
            "text-field": ["get", "point_count_abbreviated"],
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "campgrounds",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "yellow",
            "circle-radius": 4,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        // inspect a cluster on click
        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map
            .getSource("campgrounds")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.on("click", "unclustered-point", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          // console.log(e.features[0]);
          // const mag = e.features[0].properties.mag;
          // console.log(mag)
          // const tsunami = e.features[0].properties.tsunami === 1 ? "yes" : "no";

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(e.features[0].properties.popUpMarkup)
            .addTo(map);
        });

        map.on("mouseenter", "clusters", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "clusters", () => {
          map.getCanvas().style.cursor = "";
        });
        map.on("mouseenter", "unclustered-point", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "unclustered-point", () => {
          map.getCanvas().style.cursor = "";
        });
        setStyleLoaded(true);
      });
    }

    // cleanup function to remove map on unmount
    return () => map.remove();
  }, [callOneTime]);
  useEffect(() => {
    if (!Map || !styleLoaded) {
      return;
    }
    if (Map.getLayer("cluster-count")) {
      Map.removeLayer("cluster-count");
    }
    if (Map.getLayer("unclustered-point")) {
      Map.removeLayer("unclustered-point");
    }
    if (Map.getLayer("clusters")) {
      Map.removeLayer("clusters");
    }
    if (Map.getSource("campgrounds")) {
      Map.removeSource("campgrounds");
    }
    let campgrounds = { features: filteredCampgrounds };
    Map.addSource("campgrounds", {
      type: "geojson",
      // Point to GeoJSON data. This example visualizes all M1.0+ earthquakes
      // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
      // data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
      data: campgrounds,
      cluster: true,
      clusterMaxZoom: 14, // Max zoom to cluster points on
      clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
    });

    Map.addLayer({
      id: "clusters",
      type: "circle",
      source: "campgrounds",
      filter: ["has", "point_count"],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        "circle-color": [
          "step",
          ["get", "point_count"],
          "#51bbd6",
          100,
          "#f1f075",
          750,
          "#f28cb1",
        ],
        "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
      },
    });

    Map.addLayer({
      id: "cluster-count",
      type: "symbol",
      source: "campgrounds",
      filter: ["has", "point_count"],
      layout: {
        "text-field": ["get", "point_count_abbreviated"],
        "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
        "text-size": 12,
      },
    });

    Map.addLayer({
      id: "unclustered-point",
      type: "circle",
      source: "campgrounds",
      filter: ["!", ["has", "point_count"]],
      paint: {
        "circle-color": "yellow",
        "circle-radius": 4,
        "circle-stroke-width": 1,
        "circle-stroke-color": "#fff",
      },
    });

    Map.on("mouseenter", "clusters", () => {
      Map.getCanvas().style.cursor = "pointer";
    });
    Map.on("mouseleave", "clusters", () => {
      Map.getCanvas().style.cursor = "";
    });
    Map.on("mouseenter", "unclustered-point", () => {
      Map.getCanvas().style.cursor = "pointer";
    });
    Map.on("mouseleave", "unclustered-point", () => {
      Map.getCanvas().style.cursor = "";
    });
  }, [filteredCampgrounds, styleLoaded]);

  return <div ref={mapContainer} style={{ width: "100%", height: "500px" }} />;
};

export default Mapbox;
