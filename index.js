const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.imdb.com/chart/top';

const dataMovies = {};

getHtml =  async()=>{
    const {data : html} = await axios.get(url);
    return html;
};

setTimeout(()=>{
    getHtml().then((res )=> {
        const $ = cheerio.load(res);
        $('.lister-list>tr').each((i,movie)=>{
            const title = $(movie).find('.titleColumn a').text();
            const rating = $(movie).find('.ratingColumn strong').text();
            dataMovies[title] = rating;
        });
        fs.writeFile('C:\\Users\\KILD\\Desktop\\TEST SCRAPING/moviesData.json' ,JSON.stringify(dataMovies) , (err) =>{
            if(err)throw err;
            console.log('Se a cargado con exito!');
        })
    })
},10);
