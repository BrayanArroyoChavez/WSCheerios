/**
 * Author: Arroyo Chávez Brayan Alberto
 * Date: February 22, 2021
 */

/**
 * Se importa la libreria cheerio y axios
 * La libreria cheerio se utiliza para recolectar la información de la página destino
 * La libreria axios nos permite acceder a la página destino
 */


const cheerio = require('cheerio')
const axios = require('axios');
//const request = require('request-promise')

async function init(){
    
    const html = await axios.get('https://eshop-prices.com/games/on-sale?currency=MXN&direction=desc&sort_by=popularity');
    const $ = await cheerio.load(html.data);
    console.log($)
    }
init()


    /*
    try {
        const $ = await axios({
            method: 'get',
            url: 'https://eshop-prices.com/games/on-sale?currency=MXN&direction=desc&sort_by=popularity',
            responseType: 'json',
            transform: body => cheerio.load(body)
        });
        console.log($);
    } catch (error) {
        console.error(error);
    }

    try {
        const $ = await request({
            uri: 'https://eshop-prices.com/games/on-sale?currency=MXN&direction=desc&sort_by=popularity',
            transform: body => cheerio.load(body)
        });
        console.log($);
    } catch (error) {
        console.error(error);
    }
    */