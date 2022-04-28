

const controller = { 

    getIndex: (req, res) =>{
        res.render("index",{
            erro: false
        });
    },
    getErro: (req, res) =>{
        res.render("index",{
            erro: true
        })
    }

}

module.exports = controller;