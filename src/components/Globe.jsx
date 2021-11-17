import React from 'react';
import { _GlobeView as GlobeView } from '@deck.gl/core';
import { DeckGL } from 'deck.gl';
import { BitmapLayer, ArcLayer } from '@deck.gl/layers';
import { TileLayer } from '@deck.gl/geo-layers';

function Globe() {
  const viewState = {
    latitude: 50,
    longitude: 50,
    zoom: 0,
  };

  const layer = [
    new TileLayer({
      data: 'https://api.mapbox.com/styles/v1/bismowibi/ck4rd4ihm7ty71cmsy28nlvua/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlzbW93aWJpIiwiYSI6ImNra2w2bGI1ajFvdmcyd3F0eGUyYW41d3UifQ.t93EnQKbX98ceBjfIQq3eg',
      // data: ' https://api.mapbox.com/styles/v1/bismowibi/ckrczq5o320gx17ny05uknabh/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlzbW93aWJpIiwiYSI6ImNra2w2bGI1ajFvdmcyd3F0eGUyYW41d3UifQ.t93EnQKbX98ceBjfIQq3eg',
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
      <DeckGL
        views={new GlobeView({ resolution: 2 })}
        initialViewState={viewState}
        layers={layer}
        controller={true}
      />
    </div>
  );
}

export default Globe;
