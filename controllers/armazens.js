const {Armazem} = require("../models");


const controller = {

    index: async (req, res, next) => {
        let armazens = await Armazem.findAll().then(resultado =>{
            let arrayArmazens = [];
            for (armazem of resultado){
                let item = {
                    id : armazem.dataValues.id,
                    nome : armazem.dataValues.nome,
                    cidade : armazem.dataValues.cidade
                }
                arrayArmazens.push(item);
            }
            return res.render("listaArmazem",{
                armazens: arrayArmazens
            });
        });
        
    },
    cadastro: (req, res, next)=>{
        return res.render("cadastroArmazem");
    },
    cadastrar: (req, res, next) =>{
        let {nome, email, ie, cnpj, cep, uf, rua, numero, bairro, cidade} = req.body;
        let armazem = Armazem.create({
            nome,
            email,
            ie,
            cnpj,
            cep,
            rua,
            bairro,
            cidade,
            uf
        });
        
        return res.redirect("/armazens");
    }
}

module.exports = controller;