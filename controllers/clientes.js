
const controller = {

    index: (req, res, next) => {
        return res.render("listaCliente");
    },
    cadastro: (req, res) =>{
        return res.render("cadastroCliente");
    },
    cadastrar: (req, res, next) =>{
        let {nome, email, ie, cnpj, cep, uf, rua, numero, bairro, cidade} = req.body;
    }
}

module.exports = controller;