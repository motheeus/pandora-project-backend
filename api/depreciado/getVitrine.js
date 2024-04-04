import knex from "../config/db.js";

export const getVitrine = (_, res) => {
    const q = "select * from vitrine inner join carros on vitrine.id_car = idcarro where visible = 1"

    db.query(q, (err, data) =>{
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}
