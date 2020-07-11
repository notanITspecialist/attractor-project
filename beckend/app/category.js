const express = require('express');

const router = express.Router();

const Category = require('../models/Category');
const Article = require('../models/Article');

const authorization = require('../middlewerase/authorization');

router.get('/', authorization, async (req, res) => {
    try {
        const categories = await Category.find().populate('parent');

        res.send(categories)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/unregistered', async (req, res) => {
    try {
        const categories = await Category.find();

        res.send(categories)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.get('/:id', authorization, async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.id});

        res.send(category)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.put('/:id', authorization, async (req, res) => {
    try {
        const myCategory = req.body;
        const editCategory = await Category.findOne({_id: req.params.id});

        editCategory.title = myCategory.title
        if(myCategory.parent) editCategory.parent = myCategory.parent

        await editCategory.save();

        res.send(editCategory)
    } catch (e) {
        res.status(404).send(e)
    }
});

router.delete('/:id', authorization, async (req, res) => {
    try {
        const article = await Article.find({category: req.params.id})
        if(article[0]) return res.status(400).send({error: 'There is an article with this category!'})
        await Category.deleteOne({_id: req.params.id});

        res.send({message: 'Complete delete!'})
    } catch (e) {
        res.status(404).send(e)
    }
});

router.post('/', authorization, async (req, res) => {
    try {
        const category = req.body;
        const categoryInfo = {
            title: category.title
        };

        if(category.parent !== '') categoryInfo.parent = category.parent;

        if (category.title) {
            const newCategory = await Category.create(categoryInfo);

            res.send(newCategory)
        }
    } catch (e) {
        res.status(400).send(e)
    }
});

module.exports = router;