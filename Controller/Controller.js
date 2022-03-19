const conexao = require("./conexao");
const md5 = require('md5');
const responseModel = {
    success: false,
    msg: '',
    data: [],
    error: [],
    token: ''
}
module.exports = {
    async Login(req, res) {
        let SQL = 'SELECT * FROM login where email=? and senha=?';
        let VAL = [req.body.email, md5(req.body.senha)];
        let response = { ...responseModel }

        conexao.promise().query(SQL, VAL)
            .then(([rows]) => {
                if (rows.length > 0) {
                    response.success = true;
                    response.msg = 'Logado com sucesso';
                    return res.json(response)
                } else {
                    response.msg = 'Verficar credenciais';
                    return res.json(response)
                }
            })
            .catch((err) => {
                response.success = false;
                response.error = err;     
                
                return res.json(response)
            })
    }
}