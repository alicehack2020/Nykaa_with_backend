const express = require('express');
const User = require('../models/users.model');
const router = express.Router();

router.post("/post", async (req, res) => {
    const user = await User.create(req.body);

    res.redirect("/");
    return res.status(201).send({ user });
});

router.get("/signup", async (req, res) => {
    return res.render('signup');
});

router.get("/signin", async (req, res) => {
    return res.render('signin');
});

router.post("/signin/status", async (req, res) => {
    const password = req.body.password;
    const email = req.body.email;
    const user = await User.findOne({ email: email, password: password }).lean().exec();

    if (user === null) {
        return res.status(404).render("error")
    } else {
        return res.render("index")
    }
});

module.exports = router;