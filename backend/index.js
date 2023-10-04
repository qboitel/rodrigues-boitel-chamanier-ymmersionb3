const express = require('express')
const cors = require('cors')

require('dotenv').config();
const PORT = process.env.PORT || 6969

const app = express()

app.use(cors({ origin: '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/asset', express.static(__dirname + '/asset/images'));

require('./src/routes/products')(app)
require('./src/routes/address')(app)


app.listen(PORT, () => console.log(`Serveur en cours d'écoute sur le port ${PORT}`))