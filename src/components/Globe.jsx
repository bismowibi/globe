import React from 'react';
import { _GlobeView as GlobeView } from '@deck.gl/core';
import { DeckGL } from 'deck.gl';
import { BitmapLayer, ArcLayer, GridCellLayer } from '@deck.gl/layers';
import { scaleThreshold } from 'd3-scale';
import { TileLayer } from '@deck.gl/geo-layers';
import { useQuery } from 'urql';

// GraphQL Query
const PolQuery = `query {
  population {
    name
    id
    lat
    long
    max
    mean
  }
}`;

//
const Globe = () => {
  // Data Fetching with URQL
  const [result, reexecuteQuery] = useQuery({ query: PolQuery });

  const { data, fetching, error } = result;
  const gridData = data?.population;

  if (fetching)
    return (
      <div className='absolute top-[50%] left-[35%] lg:left-[45%] text-3xl font-semibold'>
        <p>Loading.....</p>
      </div>
    );
  if (error)
    return (
      <div className='absolute top-[50%] left-[45%] text-3xl font-semibold'>
        <p>Oh no... {error.message}</p>;
      </div>
    );

  // DeckGL View State
  const viewState = {
    latitude: -6,
    longitude: 106,
    zoom: 0,
  };

  const rangeColor = scaleThreshold()
    .domain([0, 10, 50, 100, 500, 1000])
    .range([
      [177, 216, 183, 150],
      [255, 247, 188, 150],
      [254, 196, 79, 150],
      [236, 112, 20, 150],
      [236, 112, 20, 150],
      [153, 52, 4, 150],
    ]);

  // Deck GL Layer
  const layer = [
    new TileLayer({
      data:
        'https://api.mapbox.com/styles/v1/bismowibi/ck4rd4ihm7ty71cmsy28nlvua/tiles/256/{' +
        'z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlzbW93aWJpIiwiYSI6ImNra2w2bGI1ajFvdmcyd3F0e' +
        'GUyYW41d3UifQ.t93EnQKbX98ceBjfIQq3eg',
      // data: 'https://api.mapbox.com/styles/v1/bismowibi/ckrczq5o320gx17ny05uknabh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlzbW93aWJpIiwiYSI6ImNra2w2bGI1ajFvdmcyd3F0eGUyYW41d3UifQ.t93EnQKbX98ceBjfIQq3eg',
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

    new GridCellLayer({
      data: gridData,
      pickable: true,
      extruded: true,
      elevationScale: 500,
      cellSize: 55000,
      getPosition: (d) => [d.long, d.lat],
      // getFillColor: (d) =>
      //   d.max === 0
      //     ? [255, 10, 0, 240]
      //     : d.max > 0 && d.max < 10
      //     ? [100, 200, 0, 240]
      //     : null,
      getFillColor: (d) => rangeColor(d.mean),
      getElevation: (d) => d.mean,
    }),
  ];

  return (
    <div>
      <DeckGL
        views={new GlobeView({ resolution: 2 })}
        initialViewState={viewState}
        layers={layer}
        controller={true}
        getTooltip={({ object }) =>
          object && `Population: ${Math.round(object.max)}`
        }
      />
    </div>
  );
};

export default Globe;
