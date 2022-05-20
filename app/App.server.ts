import type { MetaFunction } from '@remix-run/node';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Catfish',
  viewport: 'width=device-width,initial-scale=1',
});
