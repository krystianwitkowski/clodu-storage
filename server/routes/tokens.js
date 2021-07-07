const express = require('express');
const jwt = require('jsonwebtoken');

const Router = express.Router();

Router.route('/')
.get((req, res) =>{
  const token = req.get('X-Refresh-Token') || req.query.refreshToken;

  console.log(token)
  if(!token){
    res.status(400).json({
        error: {
            type: '/errors/tokens/no-refresh-token',
            title: 'Refresh token has not been sent',
            status: 400,
            detail: 'Send refresh token in header or query string'
        }
    })
  }

  try {
    
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    
    const accessToken = jwt.sign({ id: decoded.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
    const refreshToken = jwt.sign({ id: decoded.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10m' })

    res.status(200).json({ accessToken, refreshToken })

  } catch {
    res.status(401).json({
        error: {
            type: '/errors/tokens/refresh-token-expired',
            title: 'Refresh token has expired',
            status: 401,
            detail: 'Your session has expired. Please log in again'
        }
    })
  }
})

module.exports = Router;