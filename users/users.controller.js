const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/register', register);         //all
router.put('/:id', update);                 //self

module.exports = router;


function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body, req.user)
        .then(() => res.json({}))
        .catch(err => next(err));
}