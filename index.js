const app = require('express')()
const cors = require('cors')
const router = require("./config/router.js")
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.json())
app.use(router)

app.listen(8801)
