const express = require('express')
const app = express()
const port = process.env.PORT || '7000'
const futebol = require('./class/futebol')

app.get('/', (req, res) => {
  res.send('API FUTEBOL')
})

app.get('/:idcampeonato', async (req, res) => {
    const idCampeonato = req.params.idcampeonato;
    const jogos = await futebol(idCampeonato)
    res.send(jogos);
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})