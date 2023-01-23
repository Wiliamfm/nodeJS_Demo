const responseMiddleware = (req, res) => {
  return res.status(res.data.status).send(res.data.data).end();
};

export { responseMiddleware };
