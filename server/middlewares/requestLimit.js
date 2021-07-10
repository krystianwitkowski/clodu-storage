const { rateLimiter } = require('../utilities/rateLimiter.js')

module.exports = async (req, res, next) => {

    try {
        const rate = await rateLimiter.get(req.connection.remoteAddress)

        if(rate && rate.consumedPoints === 5){
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

        else {
            next()   
        }

    } catch {
        res.status(500).json({
            error: {
                type: '/errors/server',
                title: 'Something went wrong',
                status: 500,
                detail: 'The server did not respond. Try again'
            },
            validate: ['', '', '', 'Something went wrong. Try again']
        })
    }
}
