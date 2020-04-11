import express from "express";
const controller = require('./profile.controller');
var router = express.Router();
const auth = require("../middleware/auth");

router.post('/', controller.save);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);
router.get('/user/:id', controller.getByUserID);
router.get('/list', controller.getAll);
router.get('/:id', controller.getByID);
//router.get('/', controller.getByUserID); // get with userID
router.delete('/removeAvatar/:id', controller.removeAvatar);

module.exports = router;



