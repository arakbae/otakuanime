import { Anime } from "./load.js";
import * as cheerio from "cheerio";


export const Search = async (query)=>{
    const anime = [];
    if(query.length == 0){
        return {
            code:"404",
            status:"failed",
            data:{
                message:"not found"
            }
        }
    }
    const params = new URLSearchParams({
        s:query,
        post_type:"anime"
    });

    const current_search = (await Anime.get(`?${params.toString()}`)).data;
    const $ = cheerio.load(current_search);
    $("ul.chivsrc").children().each(function(){
        const this_element = $(this);
        const cover = this_element.find("img").attr("src");
        const title = this_element.find("h2").text();
        const link = this_element.find("h2 > a").attr("href");
        const gendres = [];
        this_element.find('div.set > a').each(function(){
            gendres.push({name:$(this).text(),link:$(this).attr('href')});
        });
        const desc = this_element.find("div.set").text().split(':');
        const data = {cover:cover,link:link,title:title,gendres:gendres};
        data[desc[2].trim()] = desc[3];
        anime.push(data);
    });

    return {
        code:200,
        status:"success",
        data:anime
    };
}

