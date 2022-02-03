const express = require("express");
const router = express.Router();
const armazemController = require("../controllers/armazem");

router.get("/cadastro", armazemController.cadastro);

module.exports = router;