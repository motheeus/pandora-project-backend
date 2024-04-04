import knex from "../config/db.js";

export const getProcessList = (_, res) => {
    const q = "select * from pandora_project.processo inner join carros on processo.car_id = carros.idcarro"

    db.query(q, (err, data) =>{
        if (err) return res.json(err)

        return res.status(200).json(data)
    })
}
