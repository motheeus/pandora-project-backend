const db = require("../config/db.js")

const teste = async (req, res) => { 

    const teste = req.body.nome

/*     await db('carros').where({idcarro: "62"}).first().then(users => res.json(users)) */

    const getIdTesting = await db('testing').insert({nome: teste}).then(id => {return id}).catch(err => res.status(500).send(err))


    console.log(getIdTesting[0])
}

module.exports = teste