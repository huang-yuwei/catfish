import {
  Children,
  useRef,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
} from 'react';
import { MapMain } from './Map.style';

const MAP_CONFIG: google.maps.MapOptions = {
  center: { lat: 35.652832, lng: 139.839478 }, // Tokyo
  zoom: 11,
  minZoom: 3,
  maxZoom: 15,
  rotateControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

type Props = {
  children?: React.ReactNode;
};

export const Map: React.FC<Props> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map>();

  useEffect(() => {
    if (!ref.current) return;
    setMap(new google.maps.Map(ref.current, MAP_CONFIG));
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
