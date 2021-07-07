const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.get('X-Access-Token') || req.query.accessToken;

  if(!token){
    res.status(400).json({
        error: {
            type: '/errors/tokens/no-access-token',
            title: 'Access token has not been sent',
            status: 400,
            detail: 'Send access token in header or query string'
        }
     })
  }

  try {
    const verify = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
    req.decoded = verify;
    next()

  } catch {
      res.status(401).json({
          error: {
              type: '/errors/tokens/access-token-expired',
              title: 'Access token has expired',
              status: 401,
              detail: 'You need to refresh the token'
          }
      })
  }
}