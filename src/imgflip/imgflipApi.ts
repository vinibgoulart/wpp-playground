const imgflipApi = (uri: string, options: RequestInit) => {
  const url = `https://api.imgflip.com${uri}`;

  if (process.env.DEBUG === 'true') {
    console.log({ url, options });
  }

  return fetch(url, options);
};

export { imgflipApi };
