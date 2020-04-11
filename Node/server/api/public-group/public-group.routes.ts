import express from "express";
import {copy, getByID, getList, getPublish, remove, save, update} from "./public-group.controller";
const auth = require("../middleware/auth");
var router = express.Router();

router.post('/copy/:id', copy);
router.post('/',  save);
router.put('/:id', update);
router.delete('/:id',  remove);
router.get('/list', getList);
router.get('/web', getPublish);
router.get('/:id', getByID);

module.exports = router;

