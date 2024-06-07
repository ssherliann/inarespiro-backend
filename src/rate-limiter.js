import Boom from 'boom';
import RateLimit from 'express-rate-limit';

const limiter = new RateLimit({
  windowMs: 60 * 1000, 
  max: 1000,
  handler: (req, res, next) => {
    next(Boom.tooManyRequests());
  },
});

export default limiter;
