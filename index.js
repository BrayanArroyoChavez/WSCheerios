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

async function init(){
    /**
     * En la constante html se guarda la página destino y la constante $ se guarda la página extraida 
     * convertida en un objetivo de cheerio.
     * Se utiliza el await ya que es una operación que podria requerir de mucho tiempo y es necesario que 
     * se concluya con la ejecución de estas dos operaciones antes de poder continuar.
     */
    const html = await axios.get('https://mx.investing.com/crypto/');
    const $ = await cheerio.load(html.data);
    
    /**
     * Prueba de funcionamiento
     * Extracción e impresión en consola del título de la página
     */
    const webtitle = $('title');
    console.log(webtitle.html());

    /**
     * + Extracción de la información de interes de la página para el caso en especifico de esta página la 
     * información se encontraba dentro de los registros del cuerpo de una tabla.
     * + Esto nos trae todo el codigo html de la tabla que se encuentra en la página.
     * + Para este caso se extrajeron tres valores en especifico name, symb y price son los nombres de las 
     * clases que contienen la información deseada, se hace uso de la función text para traer unicamente el
     * texto encontrada en la etiqueta de la clase
     */
    $('tbody tr').each((i,el) =>{
        const name = $(el).find('.name').text();
        const symb = $(el).find('.symb').text();
        const price = $(el).find('.price').text();
        console.log(i,name,"\t\t",symb,"\t\t$",price);
    });
    }

init()
