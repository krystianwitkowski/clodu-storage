const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.get('X-Access-Token') || req.query.accessToken;

  if(!token){
    res.status(401).json({
        error: {
            type: '/errors/token/no-token',
            title: 'No token',
            status: 400,
            detail: 'No token. You have to send a token in header or query string'
        }
     })
  }

  try {
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    req.decoded = verify;
    next()

  } catch {
        return res.status(401).json({
            error: {
                type: '/errors/token/expired',
                title: 'Token expired',
                status: 401,
                detail: 'Token expired. You need to refresh the token'
            }
        })
  }
}