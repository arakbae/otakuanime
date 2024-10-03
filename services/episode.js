import {Anime} from "otakuanime/services/load";
import * as cheerio from "cheerio";

export const getStreaming = async function (id){
    const content = (await Anime.get(`episode/${id}`)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    const title = $('div.venser > div.venutama > h1.posttl').text();
    const postedby = $('div.venser > div.venutama > div.kategoz').children().eq(1).text();
    const createdat =  $('div.venser > div.venutama > div.kategoz').children().eq(3).text();
    const url = $('div.responsive-embed-stream > iframe').attr('src');
    if(!url) {
        return {
            code:404,
            status:"failed",
            data:{
                message:"not found"
            }
        };
    }
    return {
        code:200,
        status:"success",
        data:{
            title:title,
            url_streaming:url,
            info:`${postedby}|${createdat}`
        }
    }
}
