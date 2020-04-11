export {}
import express from "express";
import {getByID, getByKey, getList, remove, save, update,} from './article.controller';
const auth = require("../middleware/auth");
var router = express.Router();

router.get('/key/:id', getByKey);
router.post('/',  save);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);
router.get('/list', getList);
router.get('/:id', getByID);

module.exports = router;


