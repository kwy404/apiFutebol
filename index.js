const express = require('express')
const app = express()
const port = process.env.PORT || '7000'
const futebol = require('./class/futebol')

app.get('/', (req, res) => {
  res.send('API FUTEBOL')
})

app.get('/:idcampeonato/:key', async (req, res) => {
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

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})