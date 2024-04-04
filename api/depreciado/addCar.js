
import { getTimestamp } from "./validation.js";

export const addCar = (req) => {
    return new Promise((resolve, reject) => {
        const q = "INSERT INTO carros(`created_date`, `marca`, `modelo`, `versao`, `motor`, `litragem_motor`, `carroceria`, `cor`, `combustível`, `cambio`, `qtd_portas`, `ano_fabricacao`, `ano_modelo`, `placa`, `assistencia_direcao`) VALUES(?)"

        const values = [
            getTimestamp(),
            req.body.marca,
            req.body.modelo,
            req.body.versao,
            req.body.motor,
            req.body.litragem_motor,
            req.body.carroceria,
            req.body.cor,
            req.body.combustível,
            req.body.cambio,
            req.body.qtd_portas,
            req.body.ano_fabricacao,
            req.body.ano_modelo,
            req.body.placa,
            req.body.assistencia_direcao
        ]
    
    
        db.query(q, [values], (err, result) => {
            if (err) reject(err)
            resolve(result.insertId)
        })

    })
}