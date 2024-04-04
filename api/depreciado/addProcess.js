import knex from "../config/db.js"
import { addCar } from "./addCar.js"
import { addVitrine } from "./addVitrine.js"

import { getTimestamp } from "./validation.js"

export const addProcess = async (req, res) => {
    const q = "INSERT INTO processo(`car_id`, `id_author`, `created_date`, `id_seller`, `selled_date`, `id_origin`, `id_buyer`, `status`, `id_vitrine`, `id_anotations`, `id_checklist`) VALUES (?)"

    // Pega ID do Carro
    let getCarId = await addCar(req).then((id) => { return id })

    // Pega ID da Vitrine
    let getVitrineId = await addVitrine(req, getCarId).then((id) => { return id })

    const values = [
        getCarId,
        req.body.id_author,
        getTimestamp(),
        req.body.id_seller,
        req.body.selled_date,
        req.body.id_origin,
        req.body.id_buyer,
        req.body.status,
        getVitrineId,
        req.body.id_anotations,
        req.body.id_checklist
    ]

    db.query(q, [values], (err, result) =>{
        if (err) return res.json(err)
        
        return res.status(200).json("Processo Criado com Sucesso!!! (até então....)")
    })

}
