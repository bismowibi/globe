import React, { useState, useEffect } from "react";
import DeckGL from "@deck.gl/react";
import { _GlobeView as GlobeView } from "@deck.gl/core";
import { BitmapLayer, ArcLayer } from "@deck.gl/layers";
import { TileLayer } from "@deck.gl/geo-layers";
import { data } from "autoprefixer";

const VIEW_STATE = {
  latitude: 50,
  longitude: 50,
  zoom: 0,
};

const World = ({}) => {
  // Fetch Data

  // Set State for storing data
  const [flightData, setFlightData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://glorious-grub-83.hasura.app/api/rest/emirates", {
      headers: {
        "x-hasura-admin-secret":
          "5rDuLhhJfExDevIi8JoLafItLYX36TtbpLHC1z17ZcO4epWzccDfV5aRp5ogMJBS",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setFlightData(data);
      });
  }, []);

  // Basemap TIles Layer
  const layer = [
    new TileLayer({
      data: " https://api.mapbox.com/styles/v1/bismowibi/ckrczq5o320gx17ny05uknabh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlzbW93aWJpIiwiYSI6ImNra2w2bGI1ajFvdmcyd3F0eGUyYW41d3UifQ.t93EnQKbX98ceBjfIQq3eg",
      minZoom: 0,
      maxZoom: 19,
      tileSize: 256,

      renderSubLayers: (props) => {
        const {
          bbox: { west, south, east, north },
        } = props.tile;

        return new BitmapLayer(props, {
          data: null,
          image: props.data,
          bounds: [west, south, east, north],
        });
      },
    }),
  ];

  return (
    <div>
      {isLoading && <div>Loading ANjing</div>}
      {flightData?.flight_route?.map((d) => {
        return (
          <div>
            <h1>{d?.destination_apirport}</h1>
          </div>
        );
      })}
      <DeckGL
        views={
          new GlobeView({
            resolution: 2,
          })
        }
        initialViewState={VIEW_STATE}
        controller={true}
        layers={layer}
      />
    </div>
  );
};

export default World;
