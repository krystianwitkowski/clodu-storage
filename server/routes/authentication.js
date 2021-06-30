const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const Router = express.Router();


const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ex8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = client.connect()

Router.route('/')
.get(async(req, res) => {
    const { name, password } = req.query;
  
    if(name.length === 0 && password.length === 0 || name.length === 0 && password.length > 0 || name.length > 0 && password.length === 0){
      res.status(401).json({
        error: {
          type: '/errors/incorrect-name-password',
          title: 'Incorrect name and password',
          status: 401,
          detail: 'Authentication failed due to incorrect username or password.'
        }
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
            const accessToken = jwt.sign({ id: isUser.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
            const refreshToken = jwt.sign({ id: isUser.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '30m' })
  
            res.status(200).json({ accessToken, refreshToken })
          }
  
          else {
            res.status(401).json({
              error: {
                type: '/errors/incorrect-name-password',
                title: 'Incorrect name and password',
                status: 401,
                detail: 'Authentication failed due to incorrect username or password.'
              }
            })
          }
        }
  
        else {
          res.status(401).json({
            error: {
              type: '/errors/incorrect-name-password',
              title: 'Incorrect name and password',
              status: 401,
              detail: 'Authentication failed due to incorrect username or password.'
            }
          })
        }
  
      } catch {
        res.status(401).json({
          error: {
            type: '/errors/incorrect-name-password',
            title: 'Incorrect name and password',
            status: 401,
            detail: 'Authentication failed due to incorrect username or password.'
          }
        })
      }
    }
  })

  module.exports = Router;