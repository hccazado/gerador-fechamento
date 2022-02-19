const express = require("express");
const router = express.Router();
const clienteController = require("../controllers/clientes");

router.get("/", clienteController.index);
router.get("/cadastro", clienteController.cadastro);
router.get("/editar/:id", clienteController.edicao);
router.post("/editar/:id", clienteController.editar);
router.post("/cadastro", clienteController.cadastrar);

module.exports = router;