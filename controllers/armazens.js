
const controller = {

    index: (req, res, next) => {
        return res.render("listaArmazem");
    },
    cadastro: (req, res, next)=>{
        return res.render("cadastroArmazem");
    },
    cadastrar: (req, res, next) =>{
        let {nome, email, ie, cnpj, cep, uf, rua, numero, bairro, cidade} = req.body;
        console.log(nome,email,cidade,ie,cnpj,cep,uf,rua,numero,bairro);
    }
}

module.exports = controller;