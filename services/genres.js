import { Anime, BaseUrl } from "otakuanime/services/load";
import * as cheerio from "cheerio";


const Genres = async function () {
    const genres = [];
    const content = (await Anime.get(`genre-list`)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    const load = $("ul.genres").children().eq(0);
    console.log(load.text());
    load.find("a").each(function(){
        const item = $(this);
        const name = item.text();
        const link = item.attr("href");
        genres.push({
            name:name,
            link:BaseUrl+link
        });

    });

    return {
        code:200,
        status:"success",
        data:genres
    }
} 

export default Genres;