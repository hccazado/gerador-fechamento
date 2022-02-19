const express = require("express");
const router = express.Router();
const fechamentoController = require("../controllers/fechamentos");

router.get("/", fechamentoController.index);
router.get("/cadastro", fechamentoController.cadastro);
router.get("/detalhe/:id", fechamentoController.detalhar);
router.get("/editar/:id", fechamentoController.edicao);
router.post("/editar/:id", fechamentoController.editar);
router.post("/cadastro", fechamentoController.cadastrar);

module.exports = router;