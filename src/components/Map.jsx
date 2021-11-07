import React from 'react';
import DeckGL from '@deck.gl/react';
import { Deck, _GlobeView as GlobeView } from '@deck.gl/core';
import {
  SolidPolygonLayer,
  GeoJsonLayer,
  ArcLayer,
  LineLayer,
} from '@deck.gl/layers';

import { StaticMap } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiYmlzbW93aWJpIiwiYSI6ImNra2w2bGI1ajFvdmcyd3F0eGUyYW41d3UifQ.t93EnQKbX98ceBjfIQq3eg';

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 0,
  pitch: 0,
};

const COUNTRIES =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

// Data to be used by the LineLayer
const data = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.781],
  },
];

const Map = () => {
  const layers = [new LineLayer({ id: 'line-layer', data })];
  const layer = [
    // A GeoJSON polygon that covers the entire earth
    // See /docs/api-reference/globe-view.md#remarks
    new SolidPolygonLayer({
      id: 'background',
      data: [
        // prettier-ignore
        [[-180, 90], [0, 90], [180, 90], [180, -90], [0, -90], [-180, -90]],
      ],
      opacity: 0.5,
      getPolygon: (d) => d,
      stroked: false,
      filled: true,
      getFillColor: [32, 201, 218],
    }),
    new GeoJsonLayer({
      id: 'base-map',
      data: COUNTRIES,
      // Styles
      stroked: true,
      filled: true,
      lineWidthMinPixels: 2,
      getLineColor: [35, 107, 19],
      getFillColor: [41, 156, 22],
    }),
    new GeoJsonLayer({
      id: 'airports',
      data: AIR_PORTS,
      // Styles
      filled: true,
      pointRadiusMinPixels: 2,
      pointRadiusScale: 2000,
      getRadius: (f) => 11 - f.properties.scalerank,
      getFillColor: [200, 0, 80, 180],
      // Interactive props
      pickable: true,
      autoHighlight: true,
      onClick: (info) =>
        // eslint-disable-next-line
        info.object &&
        alert(
          `${info.object.properties.name} (${info.object.properties.abbrev})`
        ),
    }),
    new ArcLayer({
      id: 'arcs',
      data: AIR_PORTS,
      dataTransform: (d) =>
        d.features.filter((f) => f.properties.scalerank < 4),
      // Styles
      getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
      getTargetPosition: (f) => f.geometry.coordinates,
      getSourceColor: [0, 128, 200],
      getTargetColor: [200, 0, 80],
      getWidth: 1,
    }),
  ];
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layer}
      vies={new GlobeView()}
    >
      {/* <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} /> */}
    </DeckGL>
  );
};

export default Map;
