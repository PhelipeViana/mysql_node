const conexao = require("./conexao");
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const SECRET = 'phelipe';


module.exports = {
    async Login(req, res) {

        let SQL = 'SELECT * FROM login where email=? and senha=?';
        let VAL = [req.body.email, md5(req.body.senha)];
      

        conexao.promise().query(SQL, VAL)
            .then(([rows]) => {
                if (rows.length > 0) {
                    const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 })
                    return res.status(200).json({ auth: true, token })
                } else {
                    response.msg = 'Verficar credenciais';
                    return res.json({ auth: false})
                }
            })
            .catch((err) => {
                return res.status(401).end()
            })
    }
}