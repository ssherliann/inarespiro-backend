import Boom from 'boom';
import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from './clients/redis';

const limiter = new RateLimit({
  store: new RedisStore({
    client: redis,
    resetExpiryOnChange: true,
    expiry: 30, 
  }),
  max: 1000,

  handler: (req, res, next) => {
    next(Boom.tooManyRequests());
  },
});

export default limiter;
