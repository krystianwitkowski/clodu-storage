const express = require("express");
const Router = express.Router();
const mimeTypes = require('../utilities/mime-types.js');

const { MongoClient } = require('mongodb');

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ex8xh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connect = client.connect()

Router.route("/")
.post(async (req, res) => {


    const db = client.db("cloud-drive-db");
    const users = await db.collection('users');

    const currentDoc = await users.findOne({ id: 0 })

    const update = await users.updateOne({ id: 0 }, {
        $set: {
            files: [...currentDoc.files, {
                id: currentDoc.files.length > 0 ? currentDoc.files.length : 0,
                file: JSON.stringify(req.files.file),
                base64: Buffer.from(req.files.file.data).toString('base64'),
                icons: mimeTypes.find(type => type.mimetype === req.files.file.mimetype),
                trash: false,
                starred: false 
            }]
        }
    })
    
    res.json(update);
})
.get(async(req, res) => {
    
    const db = client.db("cloud-drive-db");
    const users = await db.collection('users');

    const currentDoc = await users.findOne({ id: 0 })

    if(req.query.file){
        const last = currentDoc.files.find((file, i, arr) => (arr.length - 1 ) === i)
        res.json([last])
    }

    else {
        res.json(currentDoc.files)
    }
    
})
.put(async (req, res) => {

    const db = client.db("cloud-drive-db");
    const users = await db.collection('users');

    const currentDoc = await users.findOne({ id: 0 })

    if(req.query.trash){
        const modify = currentDoc.files.map(file => file.id === JSON.parse(req.query.id) ? { ...file, trash: JSON.parse(req.query.trash) } : { ...file })
        
        const update = await users.updateOne({ id: 0 }, {
            $set: {
                files: [...modify]
            }
        })

        res.json(update)
    }
    else if(req.query.starred){
        const modify = currentDoc.files.map(file => file.id === JSON.parse(req.query.id) ? { ...file, starred: JSON.parse(req.query.starred) } : { ...file })
    
        const update = await users.updateOne({ id: 0 }, {
            $set: {
                files: [...modify]
            }
        })

        res.json(update)
    }
})

module.exports = Router;