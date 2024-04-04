import knex from "../config/db.js";

export const addVitrine = (req, carId) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO vitrine(`id_car`, `visible`) VALUES(?)"

        const values = [
            carId,
            req.body.visible,
        ]
    
    
        db.query(q, [values], (err, result) => {
            if (err) reject(err)
            resolve(result.insertId)
        })

    })
}