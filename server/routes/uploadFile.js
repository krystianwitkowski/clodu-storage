const express = require("express");
const Router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

Router.route("/")
.post(async (req, res) => {

    const users = await db.collection('users').doc("0").get();

    const update = db.collection('users').doc("0").update({
        files: [...users.data().files, JSON.stringify(req.files.file)]
    });

})

module.exports = Router;