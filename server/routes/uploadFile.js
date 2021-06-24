const express = require("express");
const Router = express.Router();
const admin = require("firebase-admin");
const mimeTypes = require('../utilities/mime-types.js');

const db = admin.firestore();

Router.route("/")
.post(async (req, res) => {

    const users = await db.collection('users').doc("0").get();

    console.log(mimeTypes);
    const update = await db.collection('users').doc("0").update({
        files: [...users.data().files, {
            id: users.data().files.length > 0 ? users.data().files.length : 0,
            file: JSON.stringify(req.files.file),
            base64: Buffer.from(req.files.file.data).toString('base64'),
            icons: mimeTypes.find(type => type.mimetype === req.files.file.mimetype),
            trash: false,
            starred: false
        }]
    });

    res.json(update)
})
.get(async(req, res) => {
    const users = await db.collection('users').doc("0").get();
    
    if(req.query.file){
        const last = users.data().files.find((file, i, arr) => (arr.length - 1 ) === i)
        res.json([last])
    }

    else {
        res.json(users.data().files)
    }
})
.put(async (req, res) => {
    const users = await db.collection('users').doc("0").get();
    
    const modify = users.data().files.map(file => file.id === Number(req.query.id) ? { ...file, trash: true } : { ...file })
    
    const update = await db.collection('users').doc("0").update({
        files: [...modify]
    });

    res.json(update)
})

module.exports = Router;