const config = require("../config");
const cheerio = require('cheerio');
const axios = require('axios');

const futebol = async idCampeonato => {
    const url = `${config.url}${idCampeonato}`;
    const bodyData = await axios.get(url);
    const $ = cheerio.load(bodyData.data);
    const container = $(".container .main .containerBets .eventlist .dateEventAndSearch .titlePage")
    const title = $(container).find('#content_nomeDia').text();
    const jogos = []

    $(`.container .main .bodyBets .containerBets .eventlist .eventlistContainer #u${idCampeonato} .pais .eventlist-events .containerCards #cardJogo`).each((i, jogo) => {
        const dateAndHours = $(jogo).find(".dateAndHour .date").text() + " - " + $(jogo).find(".dateAndHour .hour").text()
        const teams = []
        $(jogo).find(".teams .team").each((i, team) => {
            const logoTeam = $(team).find(".logoTeam img").attr('src')
            const nameTeam = $(team).find(".nameTeam span").text()
            teams.push({
                logoTeam,
                nameTeam
            })
        })
        jogos.push({
            title,
            dateAndHours,
            teams
        })
    })
    return jogos
}

module.exports = futebol