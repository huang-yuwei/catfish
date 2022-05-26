import { Wrapper as MapinIntiator } from '@googlemaps/react-wrapper';
import { useLoaderData } from '@remix-run/react';
import { Map } from './components/Map';
import type { MapApiKey } from './Dashboard.server';
import { Layout } from './Dashboard.style';

export const Dashboard = () => {
  const apiKey = useLoaderData<MapApiKey>();

  return (
    <Layout>
      <MapinIntiator apiKey={apiKey}>
        <Map />
      </MapinIntiator>
    </Layout>
  );
};
