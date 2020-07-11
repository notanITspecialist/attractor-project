const express = require('express');

const router = express.Router();

const authorization = require('../middlewerase/authorization');

const Article = require('../models/Article');

const config = require('../config');
const multer = require('multer');
const {nanoid} = require('nanoid');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, config.uploads)
    },
    filename: (req, file, cd) => {
        cd(null, nanoid() + path.extname(file.originalname));
    }
});
const upload = multer({storage});

router.post('/', [authorization, upload.single('image')], async (req, res) => {
    try {
        const article = req.body;
        const articleInfo = {
            category: article.category,
            user: req.currentUser._id,
            title: article.title,
            description: article.description
        }

        if (req.file) {
            articleInfo.image = 'http://localhost:8000/uploads/' + req.file.filename;
        }

        const newArticle = await Article.create(articleInfo);

        res.send(newArticle)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.get('/', authorization, async (req, res) => {
    try {
        if(req.query.category) {
            console.log(req.query.category)
            const articles = await Article.find({category: req.query.category}).populate(['category', 'user']);

            return res.send(articles)
        }
        const articles = await Article.find().populate(['category', 'user']);

        res.send(articles)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.put('/:id', [authorization, upload.single('image')], async (req, res) => {
    try {
        const myArticle = req.body;
        const editArticle = await Article.findOne({_id: req.params.id});

        editArticle.title = myArticle.title;
        editArticle.category = myArticle.category;
        editArticle.description = myArticle.description;
        if (req.file) {
            editArticle.image = 'http://localhost:8000/uploads/' + req.file.filename;
        }

        await editArticle.save();

        res.send(editArticle)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/:id', authorization, async (req, res) => {
    try {
        const article = await Article.findOne({_id: req.params.id});

        res.send(article)
    } catch (e) {
        res.status(400).send(e)
    }
});

router.delete('/:id', authorization, async (req, res) => {
    try {
        await Article.deleteOne({_id: req.params.id});

        res.send({message: 'Complete delete!'})
    } catch (e) {
        res.status(404).send(e)
    }
});

module.exports = router;