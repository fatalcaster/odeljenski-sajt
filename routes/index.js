const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

let images = JSON.parse(fs.readFileSync('images.json'));

router.get("/", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "index.ejs"), { images });
});

router.get("/login", async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "login.ejs"));
});

router.post("/add", auth, async (req, res) => {
    try {
        const { url, isVideo } = req.body;

        images.push({ "url": "https://drive.google.com/uc?export=view&id=" + url.substr(32, 33), isVideo });

        fs.writeFile('images.json', JSON.stringify(images), function (err) {
            if (err) return console.log(err);
            console.log('Slika dodata');
            res.status(200).json({ message: 'Slika dodata' });
        });
    }
    catch (e) {
        res.render(path.join(__dirname, "..", "views", "user.ejs"));
    }
});

module.exports = router;
