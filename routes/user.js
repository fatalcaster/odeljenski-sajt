const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');
const jwt = require("jsonwebtoken");

const tokenSecret = "^&'[s1t0ken69$!q{}^!7518";

router.get("/", auth, async (req, res) => {
    res.render(path.join(__dirname, "..", "views", "user.ejs"));
});

router.post("/signin", async (req, res) => {
    try {
        const { password } = req.body;

        if(password == "password") {
            jwt.sign({ password }, tokenSecret, { expiresIn: 86400 }, (err, token) => {
                if (err) throw err;
                res.cookie('auth', token);
                res.status(200).json({ redirect: '/add' });
            });
            console.log("Neko se prijavio.");
        }
        else {
            console.log("Neko je pogresio sifru.");
            res.status(400).json({ message: 'Pogresna sifra' });
        }
    }
    catch (e) {
        res.render(path.join(__dirname, "..", "views", "login.ejs"));
    }
});

router.get("/logout", auth, async (req, res) => {
    try {
        res.cookie('auth', null);
        res.status(200).json({ redirect: '/add' });
    } catch (e) {
        res.status(200).json({ redirect: '/add' });
    }
});

module.exports = router;
