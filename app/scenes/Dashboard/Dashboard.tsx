import { Wrapper as MapinIntiator } from '@googlemaps/react-wrapper';
import { useLoaderData } from '@remix-run/react';
import { Box } from './components/Box';
import { Map } from './components/Map';
import type { MapApiKey } from './Dashboard.server';
import { Layout } from './Dashboard.style';

export const Dashboard = () => {
  const apiKey = useLoaderData<MapApiKey>();
  let count = 0;

  return (
    <Layout>
      <MapinIntiator apiKey={apiKey}>
        <Map>
          {/* {[...new Array(10000)].map((_, i) => {
            const x = (i % 100) * 0.001;
            if (x === 0 && !!i) count++;
            const y = count * 0.001;

            return (
              <Box key={i} position={{ lat: 35.65 + y, lng: 139.83 + x }} />
            );
          })} */}
        </Map>
      </MapinIntiator>
    </Layout>
  );
};
