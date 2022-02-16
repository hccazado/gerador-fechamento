const express = require("express");
const router = express.Router();
const armazemController = require("../controllers/armazens");

router.get("/", armazemController.index);
router.get("/cadastro", armazemController.cadastro);
router.post("/cadastro", armazemController.cadastrar);

module.exports = router;