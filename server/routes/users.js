const express = require('express');
const validator = require('email-validator');
const bcrypt = require('bcrypt');

const Router = express.Router();
const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ex8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = client.connect()

Router.route('/')
.post(async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  const db = client.db("cloud-drive-db");

  if(name.length === 0 && email.length === 0 && password.length === 0 && repeatPassword.length === 0){
    res.status(400).json({
      error: {
        type: '/errors/empty-fields',
        title: 'Incorrect name, email, password and repeat password',
        status: 400,
        detail: 'The fields cannot be empty. Try to complete all fields'
      }
    })
  }

  else if (!validator.validate(email)) {
    res.status(400).json({
      error: {
        type: '/errors/incorrect-email',
        title: 'Incorrect email',
        status: 400,
        detail: 'The field email is incorrect. Check characters like @ or .'
      }
    })
  }

  else if (password.length === 0 && password.length === 0){
    res.status(400).json({
      error: {
        type: '/errors/empty-passwords',
        title: 'Incorrect passwords',
        status: 400,
        detail: 'The fields passwords are empty.'
      }
    })
  }

  else if (password !== repeatPassword){
    res.status(400).json({
      error: {
        type: '/errors/incorrect-passwords',
        title: 'Incorrect passwords',
        status: 400,
        detail: 'The fields passwords are not the same'
      }
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
        res.status(409).json({
          error: {
            type: '/errors/user-exists',
            title: 'Such user already exists',
            status: 409,
            detail: 'A user with this name and email already exists'
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

        const created = await users.insertOne(user)

        res.status(201).json(created)

      } catch {
        res.status(500).json({
          error: {
            type: '/errors/server',
            title: 'Something went wrong with server',
            status: 500,
            detail: 'The server did not respond. Try again'
          }
        })
      }
    }
  }
})

module.exports = Router;
