import {Anime} from "otakuanime/services/load";
import * as cheerio from "cheerio";


const Detail = async function (id) {
    const detail = [];
    if(id == null ){
        return {
            code:404,
            status:"failed",
            data:{
                message:"not found"
            }
        };
    }

    const content = (await Anime.get("anime/"+id)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    $(".venser").children().each(function(){
        const item = $(this);
        const cover = item.find(".fotoanime > img").attr("src");
        let title = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(0).text().split(":")[1];
        let title_jp = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(1).text().split(":")[1];
        let rating = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(2).text().split(":")[1];
        let producer = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(3).text().split(":")[1];
        let status = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(4).text().split(":")[1];
        let total_episode = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(5).text().split(":")[1];
        let duration = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(6).text().split(":")[1];
        let release_date = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(7).text().split(":")[1];
        let studio = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(8).text().split(":")[1];
        let genre = item.find(".fotoanime > .infozin > .infozingle > p > span").eq(9).text().split(":")[1];
        let synopsis = item.find(".fotoanime > .sinopc").text();
        
        if(synopsis && rating && title && title_jp && rating && producer && status && total_episode && duration && release_date && studio && genre){
            title = title.trimStart();
            title_jp = title.trimStart();
            rating = rating.trimStart();
            producer = producer.trimStart();
            status = status.trimStart();
            total_episode = total_episode.trimStart();
            duration = duration.trimStart();
            release_date = release_date.trimStart();
            genre = genre.trimStart();
            synopsis = synopsis.trim();
        }
        if(!synopsis.length <1){
            detail.push({title:title,title_jp:title_jp,rating:rating,producer:producer,status:status,total_episode:total_episode,duration:duration,release_date:release_date,genre:genre,synopsis:synopsis});
        }
    });
    const episode = [];
    $(".venser").children().find(".episodelist > ul > li").each(function(){
        const item = $(this);
        const name = item.text();
        const link = item.find("span > a").attr("href");
        episode.push({
            name:name,
            link:link
        });
    });
    detail.push({episode:episode});
    return {
        code:200,
        status:"success",
        data:detail
    }
    
}

export default Detail;