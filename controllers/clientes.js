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
        return res.render("cadastroCliente", {
            old: {},
            isEditing: false
        });
    },
    cadastrar: async (req, res, next) =>{
        let {nome, email, ie, cnpj, conta, cep, uf, rua, numero, complemento, bairro, cidade} = req.body;
        try{
            let cliente  = await Cliente.create({
                nome,
                email,
                ie,
                cnpj,
                conta,
                cep,
                rua,
                numero,
                complemento, 
                bairro,
                cidade,
                uf
            });
            return res.redirect("/clientes");
        }
        catch (error){
            return res.redirect("/erro");
        }
    },
    edicao: async(req, res, next)=>{
        let {id} = req.params;
        let cliente = await Cliente.findByPk(id);

        return res.render("cadastroCliente", {
            old: cliente,
            isEditing: true
        });
    },
    editar: async (req, res, next)=>{
        let {id} = req.params;
        let {nome, email, ie, cnpj, conta, cep, uf, rua, numero, complemento, bairro, cidade} = req.body;
        let novosDados = {
            nome,
            email,
            ie,
            cnpj,
            conta,
            cep,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            uf
        }
        try{
            let cliente = await Cliente.findByPk(id);
            cliente.update(novosDados); 
            return res.redirect("/clientes");
        }
        catch (error){
            return res.redirect("/erro");
        }
    }
}

module.exports = controller;