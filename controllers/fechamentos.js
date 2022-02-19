const {Fechamento, Cliente, Armazem} = require("../models");
const moment = require("moment");

const controller = {

    index: async (req, res, next) => {
        let listaFechamentos = [];

        let fechamentos = await Fechamento.findAll();
        for(fechamento of fechamentos){
            let estruturaFechamento = {
                id: fechamento.dataValues.id,
                nroFechamento: fechamento.dataValues.nroFechamento,
                pc: fechamento.dataValues.pc,
                quantidade: fechamento.dataValues.quantidade
            }
        let comprador = await Cliente.findByPk(fechamento.ID_comprador).then(resultadoComprador =>{
            estruturaFechamento.comprador = resultadoComprador.dataValues.nome;
        });
        let vendedor = await Cliente.findByPk(fechamento.ID_vendedor).then(resultadoVendedor =>{
            estruturaFechamento.vendedor = resultadoVendedor.dataValues.nome;
        });
        listaFechamentos.push(estruturaFechamento);
    }
        
        return res.render("listaFechamento", {
            fechamentos: listaFechamentos
        });
    },
    cadastro: async (req, res, next) => {
        let listaClientes = [];
        let listaArmazens = [];

        let clientes = await Cliente.findAll({
            attributes: ["id","nome"]
        }).then(resultado =>{
            for( cliente of resultado){
                let clienteEstrutura = {
                    id: cliente.dataValues.id,
                    nome: cliente.dataValues.nome
                }
                listaClientes.push(clienteEstrutura);
            }
        });

        let armazens = await Armazem.findAll({
            attributes: ["id", "nome"]
        }).then(resultado =>{
            for(armazem of resultado){
                let armazemEstrutura = {
                    id: armazem.dataValues.id,
                    nome: armazem.dataValues.nome
                }
                listaArmazens.push(armazemEstrutura);
            }
        })
        return res.render("cadastroFechamento",{
            armazens: listaArmazens,
            clientes: listaClientes,
            old: {},
            isEditing: false
        });
    },
    cadastrar: async (req, res, next) =>{
        let {pc, vendedor, comprador, retirada, descarga, condicaoVenda, preco, quantidade, modalidade, descricao, pagamento, corretor, corretagemVendedor, corretagemComprador, obs} = req.body;
        let nroFechamento;
        
        let dataAtual = moment().format('L');

        console.log(dataAtual);
        let fechamento = await Fechamento.create({
            pc,
            data: moment().format('L'),
            ID_comprador: vendedor,
            ID_vendedor: comprador,
            ID_retirada: retirada,
            ID_descarga: descarga,
            condicaoVenda,
            preco,
            quantidade,
            modalidade,
            descricao,
            pagamento,
            corretor,
            corretagemComprador,
            corretagemVendedor,
            obs
        });

        nroFechamento = fechamento.dataValues.id.toString().padStart(3, 0) +"/"+moment().year();
        fechamento.update({
            nroFechamento
        });

        return res.redirect("/fechamentos");
    },
    edicao: async(req, res, next) =>{
        let {id} = req.params;
        let fechamento = await Fechamento.findByPk(id);
        let listaClientes = [];
        let listaArmazens = [];

        let clientes = await Cliente.findAll({
            attributes: ["id","nome"]
        }).then(resultado =>{
            for( cliente of resultado){
                let clienteEstrutura = {
                    id: cliente.dataValues.id,
                    nome: cliente.dataValues.nome
                }
                listaClientes.push(clienteEstrutura);
            }
        });

        let armazens = await Armazem.findAll({
            attributes: ["id", "nome"]
        }).then(resultado =>{
            for(armazem of resultado){
                let armazemEstrutura = {
                    id: armazem.dataValues.id,
                    nome: armazem.dataValues.nome
                }
                listaArmazens.push(armazemEstrutura);
            }
        })
        return res.render("cadastroFechamento",{
            armazens: listaArmazens,
            clientes: listaClientes,
            old: fechamento,
            isEditing: true
        });
        
    },
    editar: async (req, res, next) =>{
        let {id} = req.params;
        let {pc, vendedor, comprador, retirada, descarga, condicaoVenda, preco, quantidade, modalidade, descricao, pagamento, corretor, corretagemVendedor, corretagemComprador, obs} = req.body;
        console.log(vendedor +" "+ comprador);
        let fechamento = await Fechamento.findByPk(id);

        let novosDados = {
            pc,
            ID_comprador: vendedor,
            ID_vendedor: comprador,
            ID_retirada: retirada,
            ID_descarga: descarga,
            condicaoVenda,
            preco,
            quantidade,
            modalidade,
            descricao,
            pagamento,
            corretor,
            corretagemComprador,
            corretagemVendedor,
            obs
        }

        fechamento.update(novosDados);
        return res.redirect("/fechamentos");

    },
    detalhar: async (req, res, next) =>{
        let {id} = req.params;
        let fechamento = await Fechamento.findByPk(id);
        moment.locale('pt-br');
        let novaData = moment(fechamento.dataValues.data, 'YYYY-MM-DD').format('LL');
        fechamento.dataValues.data = novaData; 

        let comprador = await Cliente.findByPk(fechamento.dataValues.ID_comprador);
        let vendedor = await Cliente.findByPk(fechamento.dataValues.ID_vendedor);
        let retirada = await Armazem.findByPk(fechamento.dataValues.ID_retirada);
        let descarga = await Armazem.findByPk(fechamento.dataValues.ID_descarga);

        return res.render("fechamento",{
            fechamento: fechamento,
            comprador: comprador,
            vendedor: vendedor,
            retirada: retirada,
            descarga: descarga,
            isEditing: false
        })
    }
}

module.exports = controller;