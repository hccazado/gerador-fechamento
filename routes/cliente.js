const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clientes");

router.get("/", clienteController.index);
router.get("/cadastro", clienteController.cadastro);

router.post("/cadastro", clienteController.cadastrar);

module.exports = router;