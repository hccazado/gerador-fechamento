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
        let {pc, nFechamento, vendedor, comprador, retirada, descarga, condicaoVenda, preco, quantidade, modalidade, descricao, pagamento, corretor, corretagemVendedor, corretagemComprador, obs} = req.body;
        let nroFechamento;
                
        //gerando número de fechamento (caso não informado no formulario)
        if(!nFechamento){
            //buscando ultimo registro do banco
            let registroAnterior = await Fechamento.findOne({
                order:[['id', 'DESC']]
            });
            //Não há fechamento cadastro, gera o primeiro com valor 001/ano corrente
            if(!registroAnterior){
                nroFechamento = "1".padStart(3, 0) +"/"+moment().year();
            }
            //Encontrou fechamento cadastrado, gera novo sequencial incrementando 1 ao valor anterior
            else{
                //gerando array do valor do fechamento antetior, separando a string por "/"
                let fechamentoAnterior = registroAnterior.dataValues.nroFechamento.split("/");
                //convertendo o sequencial de fechamento em Integer e incrementando em 1 o valor
                nroFechamento = parseInt(fechamentoAnterior[0]) + 1;
                //gerando nova string de numero de fechamento
                nroFechamento = nroFechamento.toString().padStart(3, 0) +"/"+moment().year();
            }

            //Cadastrando fechamento
            let fechamento = await Fechamento.create({
                pc,
                data: moment().format('L'),
                nroFechamento,
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
            //Atualizando número do fechamento
            fechamento.update({
                nroFechamento
            });
        }
        //criando fechamento com valor informado/
        else{
            nroFechamento = nFechamento.padStart(3, 0) +"/"+moment().year();
            let fechamento = await Fechamento.create({
                pc,
                data: moment().format('L'),
                nroFechamento,
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
        }

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
        let {nFechamento, pc, vendedor, comprador, retirada, descarga, condicaoVenda, preco, quantidade, modalidade, descricao, pagamento, corretor, corretagemVendedor, corretagemComprador, obs} = req.body;
        let fechamento = await Fechamento.findByPk(id);
        console.log(fechamento);

        let novosDados = {
            pc,
            nroFechamento: nFechamento,
            ID_comprador: comprador,
            ID_vendedor: vendedor,
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