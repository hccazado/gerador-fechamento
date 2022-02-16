const controller = {

    index: (req, res, next) => {
        return res.render("listaFechamento");
    },
    cadastro: (req, res, next) => {
        return res.render("cadastroFechamento");
    },
    cadastrar: (req, res, next) =>{
        console.log(req.body);
        return res.render("/");
    }
}

module.exports = controller;