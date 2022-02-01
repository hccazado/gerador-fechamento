const bcrypt = require("bcryptjs");

const {Login, Sequelize} = require("../models");
const Op = Sequelize.Op;

const controller = {

    getLogin: (req, res) =>{
        res.render("login",{
            error: false
        });
    },

    postLogin: async (req, res, next) =>{
        let {email, password} = req.body;
        /*const login = await Login.create({
            nome: 'José',
            email: 'jacazado@gmail.com',
            password: '$2a$10$utfuha069a4d.tIWspRfOeIuAv/N7eAq1yTOeLy19Zu4kH88N568K'
        });*/
        try{
            const login = await Login.findOne({
                where: {
                    email: email
                }
            }).then(retorno=>{
                if(bcrypt.compareSync(password, retorno.password)){
                    let sessao = {
                        nome: retorno.nome,
                        email: retorno.email
                    }
                    req.session.user = sessao;
                    return res.render("index", {
                        user:sessao.nome
                    });
                }
                res.send("deu erro");
            })

            
        }
        catch(err){
            console.log(err);
        }
        
        
    }

}

module.exports = controller;