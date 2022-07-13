/**
 * @param {import('http').IncomingMessage} req
 * @param {import('http').ServerResponse} res
 * @param {(err?: any) => void} next
 */

export default (req, res, next) => {
  if (req.method !== 'GET') {
    return next();
  }

  res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
  next();
};
