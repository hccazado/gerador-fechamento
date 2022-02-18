const {Cliente} = require("../models");

const controller = {

    index: async (req, res, next) => {
        let clientes = await Cliente.findAll().then(resultado =>{
            let arrayClientes = [];
            for(cliente of resultado){
                let clienteEstrutura = {
                    id : cliente.dataValues.id,
                    nome : cliente.dataValues.nome,
                    cidade : cliente.dataValues.cidade
                }
                arrayClientes.push(clienteEstrutura);
            }
            return res.render("listaCliente", {
                clientes : arrayClientes
            });
        })
        
    },
    cadastro: (req, res) =>{
        return res.render("cadastroCliente");
    },
    cadastrar: async (req, res, next) =>{
        let {nome, email, ie, cnpj, cep, uf, rua, numero, bairro, cidade} = req.body;
        let cliente  = await Cliente.create({
            nome,
            email,
            ie,
            cnpj,
            cep,
            rua,
            numero,
            bairro,
            cidade,
            uf
        });
        return res.redirect("/clientes");
    }
}

module.exports = controller;