const db = require("../config/db.js")
const bcrypt = require("bcrypt")

const {existsOrError, notExistsOrError, equalsOrError} = require("./validation.js")

const encryptPassword = password => {
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

const saveUser = async (req, res) => {
    const user = {...req.body}
    if (req.params.id) user.id_user = req.params.id
    
    try {
        existsOrError(user.nome, "Nome não informado")
        existsOrError(user.sobrenome, "Sobrenome não informado")
        existsOrError(user.password, "Senha não informada")
        existsOrError(user.confirmPassword, "Confirmação não informada")
        existsOrError(user.username, "Nome de Usuário não informado!")
        equalsOrError(user.password, user.confirmPassword, "Senhas não coincidem")

        const getUserById = await db('users').where({username: user.username}).first()
        if(!user.id_user) {
            notExistsOrError(getUserById, 'Usuário já cadastrado')
        }

    } catch (msg) {
        return res.status(400).send(msg)
    }

    user.password = encryptPassword(user.password)
    delete user.confirmPassword

    if(user.id_user){
        db('users').update(user).where({id_user: user.id_user}).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
    } else {
        db('users').insert(user).then(_ => res.status(204).send()).catch(err => res.status(500).send(err))
    }

}

const getUser = async (req, res) => {
    db('users').select('id_user', 'nome', 'sobrenome', 'email', 'password', 'cargo', 'username').then(users => res.json(users)).catch(err => res.status(500).send(err))
}

module.exports = {getUser, saveUser}

