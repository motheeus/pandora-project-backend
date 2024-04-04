const { authSecret } = require("../.env")
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const db = require("../config/db.js")

const signIn = async (req, res) => {
    if (!req.body.username || !req.body.password){
        return res.status(400).send('Informe Usuário e Senha!')
    }

    const user = await db('users')
        .where({username: req.body.username})
        .first()
    
    if (!user) return res.status(400).send('Usuário não encontrado')

    const isMatch = bcrypt.compareSync(req.body.password, user.password)
    if (!isMatch) return res.status(401).send('Nome de Usuário ou Senha Invalido')

    const now = Math.floor(Date.now() / 1000)

    const payload = {
        id: user.id_user,
        name: user.nome,
        sobrenome: user.sobrenome,
        username: user.username,
        cargo: user.cargo,
        iat: now,
        exp: now + (60 * 60 * 24 *3)
    }

    res.json({
        ...payload,
        token: jwt.encode(payload, authSecret)
    })
}

const validateToken = async (req, res) => {
    const userData = req.body || null
    try {
        if (userData) {
            const token = jwt.decode(userData.token, authSecret)
            if(new Date(token.exp * 1000 > new Date)) {
                return res.send(true)
            }
        }
    } catch (e) {

    }

    res.send(false)
}

module.exports = {validateToken, signIn}