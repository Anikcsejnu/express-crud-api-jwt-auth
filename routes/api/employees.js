const express = require('express');
const router = express.Router();

const data = {};
data.employee = require('../../data/employee.json');

router.route('/')
    .get((req, res) => {
        res.json(data.employee)
    })
    .post((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req, res) => {
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req, res) => {
        res.json({
            "id": req.body.id
        })
    })

router.route('/:id')
    .get((req, res) => {
        console.log("here");
        res.json({
            "id": req.params.id
        })
    })

module.exports = router;
