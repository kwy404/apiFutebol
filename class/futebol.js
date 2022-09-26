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

const aoVivo = async () => {
    const url = `https://rksporte.net/sistema_v2/usuarios/simulador/desktop/AoVivo.aspx`;
    const bodyData = await axios.get(url);
    const $ = cheerio.load(bodyData.data);
    const jogos = []
    let title = ""
    $(`.container .main .bodyBets .containerBets #updAoVivo .eventlist .eventlistContainer div`).each((i, jogo) => {
        const teams = []
        if($(jogo).find(".eventlist-country .name").text()){
            title = $(jogo).find(".eventlist-country .name").text()
        } else if($(jogo).find(".eventlist-events .containerCards")){
            $(jogo).find(".eventlist-events .containerCards").each((i, event) => {
                $(event).find('.cardItem').each((i, time) => {
                    const timerLiveTime = $(time).find('.timerLive .time')
                    const timerLivePeriod = $(time).find('.timerLive .period')
                    $(time).find('.teams .team').each((i, times) => {
                        const logoTeam = $(times).find(".logoTeam img").attr('src')
                        const nameTeam = $(times).find(".nameTeam ").text()
                        const score = $(times).find(".score").text()
                        teams.push({
                            logoTeam,
                            nameTeam,
                            score
                        })
                    })
                })
            })
        }
        if(teams.length > 0){
            jogos.push({
                title,
                teams
            })
        }
    })
    return jogos
}


module.exports = {futebol, aoVivo}