import { useState, useEffect } from 'react';

type Props = {
  position: google.maps.LatLngLiteral;
  map: google.maps.Map;
};

export const Box: React.FC<Props> = ({ map, position }) => {
  const [box, setBox] = useState<google.maps.Polygon>();

  useEffect(() => {
    const { lat, lng } = position;

    if (!box) {
      const bb = new google.maps.Polygon({
        paths: [
          { lat, lng },
          { lat: lat + 0.001, lng: lng },
          { lat: lat + 0.001, lng: lng + 0.001 },
          { lat: lat, lng: lng + 0.001 },
        ],
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      });

      setBox(bb);
      bb.setMap(map);
    }

    return () => {
      box && box.setMap(null);
    };
  }, [box, map, position]);

  return <div></div>;
};

// export const Box: React.FC<Props> = ({ map, position }) => {
//   const [box, setBox] = useState<google.maps.Rectangle>();

//   useEffect(() => {
//     const { lat, lng } = position;

//     if (!box) {
//       const bb = new google.maps.Rectangle({
//         bounds: {
//           north: lat,
//           south: lat - 0.001,
//           east: lng,
//           west: lng - 0.001,
//         },
//         map,
//         fillColor: '#FF0000',
//         fillOpacity: 0.35,
//         strokeWeight: 0,
//       });

//       setBox(bb);
//     }

//     return () => {
//       box && box.setMap(null);
//     };
//   }, [box, position]);

//   return <div></div>;
// };
