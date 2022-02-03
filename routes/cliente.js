const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/cliente");

router.get("/cadastro", clienteController.cadastrar);

module.exports = router;