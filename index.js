const express = require('express')
const app = express()
const port = process.env.PORT || '7000'
const {futebol, aoVivo} = require('./class/futebol')
const cors = require('cors');

app.use(cors())

app.get('/', (req, res) => {
  res.send('API FUTEBOL')
})

app.get('/:idcampeonato/:key', async (req, res) => {
    //Basic api key
    if(req.params.key === "9@:@77PA4!3pjP.@mZ2JY`4C82uqbe"){
        const idCampeonato = req.params.idcampeonato;
        try {
            const jogos = await futebol(idCampeonato)
            res.send(jogos);
        } catch (error) {
            res.send('{error: true}')
        }
    } else{
        res.send('{error: true, message: "API KEY INVALID"}')
    }
})

app.get('/aoVivo', async (req, res) => {
    try {
        const jogos = await aoVivo()
        res.send(jogos);
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})