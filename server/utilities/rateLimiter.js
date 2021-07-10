const { RateLimiterMemory } = require('rate-limiter-flexible');

const opts = {
    points: 5, // 5 points
    duration: 60 * 15 // Per second // Set 15 minutes
};
const rateLimiter = new RateLimiterMemory(opts);

const getRateLimiter = async (req, res, json) => {
    try {
        await rateLimiter.consume(req.socket.remoteAddress);

        return res.status(401).json(json);
    } catch {
        res.status(429).json({
            error: {
                type: '/errors/auth/too-many-requests',
                title: 'Too many requests',
                status: 401,
                detail: 'Too many requests to the server were made. Try again in 15 minutes'
            },
            validate: ['', 'Try again in 15 minutes']
        })
    }
}

module.exports = {
    rateLimiter,
    getRateLimiter
}