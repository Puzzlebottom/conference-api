export const loggerMiddleware = (req, res, next) => {
  console.log(`Started ${req.method} ${req.originalUrl}`);
  console.log(`Request body: ${JSON.stringify(req.body)}`);
  next();
  console.log(`Completed ${req.method} ${req.originalUrl} with status ${res.statusCode}`);
  console.log('');
};