import express from "express";
const controller = require('./main.controller');
const userController = require('../user/user.controller');
var router = express.Router();
const auth = require("../middleware/auth");

router.post('/sign-up', userController.signUp);
router.post('/sign-in', userController.signIn);
router.get('/settings', auth, controller.settings);
router.get('/', controller.main);

module.exports = router;



