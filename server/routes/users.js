const express = require("express");
const validator = require("email-validator");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const Router = express.Router();

const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ex8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = client.connect()

Router.route("/")
.post(async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  const db = client.db("cloud-drive-db");

  if(name.length === 0 && email.length === 0 && password.length === 0 && repeatPassword.length === 0){
    res.status(400).json({
        error: {
            status: 400,
            message: 'The fields cannot be empty. Please try to complete all fields'
        }
    })
  }

  else if (!validator.validate(email)) {
    res.status(400).json({
        error: {
            status: 400,
            message: 'The field email is incorrect. Please check this field to see if it has signs like @ or .'
        }
    })
  }

  else if (password.length === 0 && password.length === 0){
    res.status(400).json({
        error: {
            status: 400,
            message: 'The fields passwords cannot be empty. Please check this fields to see if it have characters.'
        }
    })
  }

  else if (password !== repeatPassword){
    res.status(400).json({
        status: 400,
        message: 'The fields passwords are not the same. Please check this fields to see if it have the same characters.'
    })
  }

 else {

    const db = client.db('cloud-drive-db');
    const users = await db.collection('users');

    const isUser = await users.findOne({ 
      $or: [
        {
          name: name
        },
        {
          email: email
        }
      ]
    })

    if(isUser){
        res.status(400).json({
            error: {
                status: 400,
                message: 'Such user already exists'
            }
        })
    }

    else {

      try {
        const saltRounds = 10;
        
        const hashPassword = await bcrypt.hash(password, saltRounds);
        const hashRepeatPassword = await bcrypt.hash(repeatPassword, saltRounds);
        

        const elements = await users.find().toArray()

        const user = {
          id: elements.length,
          name,
          email,
          password: hashPassword,
          repeatPassword: hashRepeatPassword,
          files: []
        }

        const create = await users.insertOne(user)

        res.status(201).json(create)

      } catch {
        res.status(500).json({
          error: {
            status: 500,
            message: 'Something went wrong. Please try again'
          }
        })
      }
    }
  }
})
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
