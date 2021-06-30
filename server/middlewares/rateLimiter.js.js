const { RateLimiterMemory } = require('rate-limiter-flexible');

const opts = {
    points: 6, // 5 points
    duration: 60 * 15 // Per second // Set 15 minutes
  };
  
const rateLimiter = new RateLimiterMemory(opts);

module.exports = async (req, res, next) => {
    try {
        await rateLimiter.consume(req.connection.remoteAddress)
        next()
    } catch {
        res.status(429).json({
            error: {
                type: '/errors/too-many-requests',
                title: 'Too many requests',
                status: 401,
                detail: 'Too many requests to the server were made. Try again in 15 minutes'
            }
        })
    }
}
