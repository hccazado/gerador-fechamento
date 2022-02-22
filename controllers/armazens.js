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
        return res.render("cadastroArmazem", {
            isEditing: false,
            old: {}
        });
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
    },
    edicao: async(req, res, next)=>{
        let {id} = req.params;
        let armazem = await Armazem.findByPk(id);
        console.log(armazem);

        return res.render("cadastroCliente", {
            old: armazem,
            isEditing: true
        })
    },
    editar: async (req, res, next)=>{
        let {id} = req.params;
        let {nome, email, ie, cnpj, cep, uf, rua, numero, bairro, cidade} = req.body;
        let novosDados = {
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
        }

        let armazem = await Armazem.findByPk(id);

        armazem.update(novosDados);
        
        return res.redirect("/armazens");
    }
}

module.exports = controller;