export default {
  host: process.env.REDIS_HOST, 
  port: process.env.REDIS_PORT, 
  ttl: null, // Time to live for cache entries (in seconds). Set to null for no expiration.
};
