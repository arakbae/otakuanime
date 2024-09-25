import { Anime, BaseUrl } from "otakuanime/services/load";
import * as cheerio from "cheerio";

const maxPagination = async function (name){
    const numbers = [];
    const content = (await Anime.get(`genres/${name}`)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    $(".pagenavix a").each(function(){
        const item = $(this);
        if(item.text().match(/(\d)/)){
            numbers.push(Number(item.text()));
        }
    });
    let lg_number = numbers[0];
    numbers.map((num,index)=>{
        if(num > lg_number){
            lg_number = numbers[index+1];
        }
    });

    return lg_number
}

export const Genre = async function (name,pagination) {
    const anime = [];
    let path = ``
    if(name == null){
        return {
            code:401,
            status:"failed",
            data:{
                message:"query name is required"
            }
        }
    }
    path = `${name}`;
    if(pagination != null){
        if(!pagination.match(/(\d)/)){
            return {
            code:404,
            status:"failed",
            data:{
                message:"pagination instead of the numbers "
            }
            }
        }
        if(Number(pagination) > await maxPagination(name) || Number(pagination) <= 1){
            return {
                code:404,
                status:"failed",
                data:{
                message:"not found"
                }
            }
        }
        path = path+"/page/"+pagination;
    }

    const content = (await Anime.get(`genres/${path}`)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    $('.venser').find('.page > .col-md-4.col-anime-con').each(function(){
        const item = $(this);   
        const genres = [];
        const url = item.find(".col-anime-title a").attr('href');
        const title = item.find(".col-anime-title").text();
        const studio = item.find(".col-anime-studio").text();
        const episode = item.find(".col-anime-eps").text();
        const rating = item.find('.col-anime-rating').text();
        const cover = item.find(".col-anime-cover > img").attr("src");
        const synopsis = item.find(".col-synopsis").text();
        const date = item.find(".col-anime-date").text();
        const trailer = item.find(".col-anime-trailer").text();
        
        item.find('.col-anime-genre > a').each(function(){
           genres.push({
            name:$(this).text(),
            link:$(this).attr("href")
           });
        });
        anime.push({
            url,
            cover,
            title,
            studio,
            rating,
            genres,
            episode,
            synopsis,
            date,
            trailer
        });
    });

    return {
        code:200,
        status:"success",
        data:anime,
        max_page:await maxPagination(name)
    };
}
const Genres = async function () {
    const genres = [];

    const content = (await Anime.get(`genre-list`)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    const load = $("ul.genres").children().eq(0);
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