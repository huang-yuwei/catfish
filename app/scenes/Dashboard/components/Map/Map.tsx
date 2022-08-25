import {
  Children,
  useRef,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
} from 'react';
import { GoogleMapsOverlay } from '@deck.gl/google-maps';
import { BitmapLayer, SolidPolygonLayer } from '@deck.gl/layers';
import { CanvasExtract } from '@pixi/canvas-extract';
import * as PIXI from 'pixi.js';
import { MapMain } from './Map.style';

const MAP_CONFIG: google.maps.MapOptions = {
  center: { lat: 35.652832, lng: 139.839478 }, // Tokyo
  zoom: 15,
  minZoom: 3,
  mapId: 'ce4d0a85d7390982',
  maxZoom: 15,
  rotateControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

type Props = {
  children?: React.ReactNode;
};

let count = 0;

const data = (num: number) => {
  return [...new Array(num)].map((_, i) => {
    const base = i % 1000;
    const x = base * 0.001 + MAP_CONFIG.center?.lng;
    if (base === 0 && !!i) count++;
    const y = count * 0.001 + MAP_CONFIG.center?.lat;

    return {
      polygon: [
        [x, y],
        [x, y + 0.001],
        [x + 0.001, y + 0.001],
        [x + 0.001, y],
      ],
      color: Math.floor(Math.random() * 255),
    };
  });
};

const qq = [
  { lat: 33.333333333333336, lng: 130.009375 },
  { lat: 33.333333333333336, lng: 130.01250000000002 },
  { lat: 33.33541666666667, lng: 130.01250000000002 },
  { lat: 33.33541666666667, lng: 130.009375 },
];

const dd = [
  {
    polygon: qq.map((q) => [q.lng, q.lat]),
    // [
    //   [130.0093, 33.3333], //lng, lat
    //   [130.0093, 33.3354],
    //   [130.0125, 33.3354],
    //   [130.0125, 33.3333],
    // ],
    color: Math.floor(Math.random() * 255),
  },
];

// const data = [...new Array(60000)].map((_, i) => {
//   const base = i % 100;
//   const x = base;
//   if (base === 0 && !!i) count++;
//   const y = count;

//   return {
//     polygon: [x, y, 100, 100],
//     color: Math.floor(Math.random() * 16777215).toString(16),
//   };
// });

export const Map: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    console.log('try!!');

    if (!ref.current) return;
    const map = new google.maps.Map(ref.current, MAP_CONFIG);

    const webGLOverlayView = new google.maps.WebGLOverlayView();
    // const app = new PIXI.Application({});

    // console.log('try!');

    // let container, renderer, graphics;

    // webGLOverlayView.onAdd = () => {
    //   //console.log('onAdd');
    // };
    // webGLOverlayView.onContextRestored = ({ gl }) => {
    //   renderer = PIXI.autoDetectRenderer({
    //     view: gl.canvas,
    //     width: gl.canvas.width,
    //     height: gl.canvas.height,
    //   });
    //   graphics = new PIXI.Graphics();
    //   graphics.beginFill(0xff0000);
    //   graphics.lineStyle(5, 0xffff00);

    //   const a = map.getProjection()?.fromLatLngToPoint(MAP_CONFIG.center);

    //   graphics.drawRect(a.x, a.y, 1000, 3000);
    //   container = new PIXI.Container();
    //   container.interactive = true;

    //   //container.addChild(graphics);

    //   graphics.zIndex = 10000;

    //   //renderer.render(graphics);

    //   console.log(a, renderer.width, container.width);
    // };
    // webGLOverlayView.onDraw = ({ gl, coordinateTransformer }) => {
    //   // console.log('onDraw');
    //   renderer.render(container);
    // };

    // webGLOverlayView.setMap(map);

    // const app = new PIXI.Application({ width: 0, height: 0, resolution: 2 });
    // document.body.appendChild(app.view);
    // console.log(app);

    // const container = new PIXI.ParticleContainer();

    // data.forEach((d) => {
    //   const sprite = new PIXI.Sprite(PIXI.Texture.WHITE);

    //   sprite.tint = parseInt(d.color, 16);
    //   sprite.x = d.polygon[0];
    //   sprite.y = d.polygon[1];
    //   sprite.width = d.polygon[2];
    //   sprite.height = d.polygon[3];

    //   container.addChild(sprite);
    // });

    // const graphics = new PIXI.Graphics();
    // graphics.beginFill(0xff0000);
    // graphics.lineStyle(5, 0xffff00);
    // graphics.drawRect(0, 0, 1000, 3000);

    //container.addChild(graphics);
    //app.stage.addChild(container);

    // app.renderer.plugins.extract.canvas(container).toBlob((b) => {
    //   const aa = URL.createObjectURL(b);

    //   const bounds = {
    //     north: MAP_CONFIG.center?.lat,
    //     south: MAP_CONFIG.center?.lat - 5,
    //     east: MAP_CONFIG.center?.lng,
    //     west: MAP_CONFIG.center?.lng - 5,
    //   };

    //   const bitmapLayer = new BitmapLayer({
    //     id: 'asdadsadadsadsa',
    //     opacity: 1,
    //     bounds: [bounds.west, bounds.south, bounds.east, bounds.north],
    //     image: aa,
    //   });

    //   const sData = [
    //     {
    //       polygon: [
    //         [bounds.west, bounds.south],
    //         [bounds.west, bounds.north],
    //         [bounds.east, bounds.north],
    //         [bounds.east, bounds.south],
    //       ],
    //       color: 200,
    //     },
    //     {
    //       polygon: [
    //         [bounds.west, bounds.south],
    //         [bounds.west, bounds.north],
    //         [bounds.east + 0.001, bounds.north],
    //         [bounds.east + 0.001, bounds.south],
    //       ],
    //       color: 255,
    //     },
    //   ];

    //   const la = new SolidPolygonLayer({
    //     data: data,
    //     getPolygon: (d) => {
    //       return d.polygon;
    //     },
    //     getFillColor: (d) => [0, 0, d.color],
    //   });

    //   const deckOverlay = new GoogleMapsOverlay({
    //     layers: [bitmapLayer],
    //   });

    //   const historicalOverlay = new google.maps.GroundOverlay(aa, bounds, {
    //     clickable: false,
    //   });

    //   const imageMapType = new google.maps.ImageMapType({
    //     getTileUrl: function (coord, zoom) {
    //       return aa;
    //     },
    //     tileSize: new google.maps.Size(256, 256),
    //   });

    //   console.log({ deckOverlay, bitmapLayer });

    //   deckOverlay.setMap(map);
    // });

    const props = {
      //data: data(10000),
      data: dd,
      getPolygon: (d) => {
        return d.polygon;
      },
      getFillColor: (d) => [0, 0, d.color],
    };

    const la = new SolidPolygonLayer(props);

    const deckOverlay = new GoogleMapsOverlay({
      layers: [la],
    });

    console.log(props);
    deckOverlay.setMap(map);

    let changed = false;

    map.addListener('zoom_changed', () => {
      const zoom = Math.floor(map.getZoom() || 0);

      // if (zoom < 13 && !changed) {
      //   changed = true;

      //   la.updateState({
      //     props: { ...props, data: data(1000) },
      //     oldProps: props,
      //     changeFlags: { dataChanged: true },
      //   });
      //   console.log('change');
      // }

      // if (zoom > 13 && changed) {
      //   changed = false;

      //   la.updateState({
      //     props: { ...props, data: data(10000) },
      //     oldProps: props,
      //     changeFlags: { dataChanged: true },
      //   });
      //   console.log('change');
      // }
    });

    setMap(map);
  }, []);

  return (
    <MapMain ref={ref}>
      {map &&
        Children.map(children, (child) => {
          if (isValidElement(child)) return cloneElement(child, { map });
        })}
    </MapMain>
  );
};
