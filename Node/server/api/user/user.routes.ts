import express from "express";

const controller = require('./user.controller');
const auth = require("../middleware/auth");
var router = express.Router();

router.post('/', controller.post);
router.get('/', controller.get);
router.put('/:id', controller.post);
router.delete('/:id', controller.remove);

module.exports = router;


