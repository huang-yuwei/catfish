export type MapApiKey = string;

export const loader = (): MapApiKey => {
  if (!process.env.GOOGLE_MAP_API_KEY) {
    throw Error(`Oops! Cannot find the google map api key`);
  }
  return process.env.GOOGLE_MAP_API_KEY;
};
