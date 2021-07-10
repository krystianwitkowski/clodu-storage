const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { rateLimiter, getRateLimiter } = require('../utilities/rateLimiter.js');
const { MongoClient } = require('mongodb');

const Router = express.Router();

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ex8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = client.connect()

Router.route('/')
.get(async(req, res) => {
    const { name, password } = req.query;
  
    if(name.length === 0 && password.length === 0){
      getRateLimiter(req, res, {
        error: {
          type: '/errors/auth/incorrect-name-password',
          title: 'Incorrect name and password',
          status: 401,
          detail: 'Authentication failed due to incorrect name or password'
        },
        validate: ['This field is required', 'This field is required']
      })
    }

    else if (name.length === 0 && password.length > 0){
      getRateLimiter(req, res, {
        error: {
          type: '/errors/auth/incorrect-name',
          title: 'Incorrect name',
          status: 401,
          detail: 'Authentication failed due to incorrect name'
        },
        validate: ['This field is required', '']
      })
    }

    else if (name.length > 0 && password.length === 0){
      getRateLimiter(req, res, {
        error: {
          type: '/errors/auth/incorrect-password',
          title: 'Incorrect password',
          status: 401,
          detail: 'Authentication failed due to incorrect password'
        },
        validate: ['', 'This field is required']
      })
    }
  
    else {
      try {
        const db = client.db("cloud-drive-db");
        
        const users = await db.collection('users');
  
        const isUser = await users.findOne({ name: name })
    
        if(isUser){
          const match = await bcrypt.compare(password, isUser.password)
  
          if(match){
            await rateLimiter.delete(req.socket.remoteAddress);

            const accessToken = jwt.sign({ id: isUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '5m' })
            const refreshToken = jwt.sign({ id: isUser.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '10m' })

            res.status(200).json({ accessToken, refreshToken })
          }
  
          else {
            getRateLimiter(req, res, {
              error: {
                type: '/errors/auth/failed',
                title: 'Authentication failed',
                status: 401,
                detail: 'Authentication failed due to incorrect name or password'
              },
              validate: ['', 'Authentication failed']
            })
          }
        }
  
        else {
          getRateLimiter(req, res, {
            error: {
              type: '/errors/auth/failed',
              title: 'Authentication failed',
              status: 401,
              detail: 'Authentication failed due to incorrect name or password'
            },
            validate: ['', 'Authentication failed']
          })
        }
  
      } catch {
        getRateLimiter(req, res, {
          error: {
            type: '/errors/auth/failed',
            title: 'Authentication failed',
            status: 401,
            detail: 'Authentication failed due to incorrect name or password'
          },
          validate: ['', 'Authentication failed']
        })
      }
    }
  })

  module.exports = Router;