var express = require('express');
var router = express.Router();

//importando controllers
const loginController = require("../controllers/login");
const indexController = require("../controllers/index");

/* GET home page. */
router.get("/", indexController.getIndex);

router.get('/login', loginController.getLogin);

router.post("/login", loginController.postLogin);

module.exports = router;
