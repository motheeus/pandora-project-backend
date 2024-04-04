module.exports = middleware => {
    return (req, res, next) => {
        if (req.user.cargo == "admin") {
            middleware(req, res, next)
            console.log(req.user.cargo)
        } else {
            res.status(401).send("Usuário não é administrador")
        }
    }
}