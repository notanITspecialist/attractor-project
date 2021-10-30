const express = require('express');

const User = require('../models/User');
const Category = require('../models/Category');
const Article = require('../models/Article');

const router = express.Router();

const bcrypt = require('bcrypt');

const authorization = require('../middlewerase/authorization');

router.get('/', authorization, async (req, res) => {
   const users =  await User.find();

   res.send(users);
});

router.get('/:id', authorization, async (req, res) => {
    const user =  await User.findOne({_id: req.params.id});

    res.send(user);
});

router.put('/:id', authorization, async (req, res) => {
    try {
        const myUser = req.body;
        const editUser = await User.findOne({_id: req.params.id});

        console.log(myUser, editUser)

        editUser.username = myUser.username;
        editUser.displayName = myUser.displayName;
        if(myUser.password) {
            editUser.password = myUser.password
        }

        editUser.addToken();
        await editUser.save();

        res.send(editUser)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/', async (req, res) => {
    const newUser = new User(req.body);

    try {
        newUser.addToken();
        await newUser.save();

        res.send(newUser)
    } catch (e) {
        res.status(404).send({error: e})
    }
});

router.post('/sessions', async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});

        if (!user) {
            return res.status(404).send({message: 'Username or password not correct!'});
        } else {
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if (!correctPassword) {
                return res.status(404).send({message: 'Username or password not correct!'});
            }
        }
        user.addToken();
        user.save();

        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(404).send(e)
    }
});

router.delete('/sessions', async (req, res) => {
    const success = {message: "success"};
    try {
        const token = req.get('Authorization').split(' ')[1];

        if (!token) return res.send(success);

        const user = await User.findOne({token});

        if (!user) return res.send(success);

        user.addToken();
        await user.save();

        return res.send(success);

    } catch (e) {
        res.send(success)
    }

});

router.delete('/:id', authorization, async (req, res) => {
    const article = await Article.find({user: req.params.id});
    if (req.currentUser._id.toString() === req.params.id.toString()) {
        return res.status(400).send({message: 'Unable to delete your account!'})
    } else if (article[0]) {
        return res.status(400).send({message: 'Remained content created by this user!'})
    }
    await User.deleteOne({_id: req.params.id});

    res.send({message: 'Complete delete!'});
});

module.exports = router;