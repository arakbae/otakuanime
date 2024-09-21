import { Anime } from "otakuanime/services/load";
import * as cheerio from "cheerio";

const maxPagination = async ()=>{
  const content = (await Anime.get(`complete-anime`)).data;
  const $ = cheerio.loadBuffer(Buffer.from(content));
  const load = $('.pagination').children().eq(0);
  const list_numbers = [];
 
  load.find('.pagenavix > a').each(function(){
    if($(this).text().match(/(\d)/)){
      list_numbers.push(Number($(this).text()));
    }
  });
  let lg_number = list_numbers[0];
  list_numbers.map((num,index)=>{
   if(num > lg_number) {
    lg_number = list_numbers[index+1];
   }
  })
  return lg_number;
}

const Completed = async (pagination)=>{
    const animeCompleted = [];
    let path = `complete-anime`;
    if(pagination != null){
        if(!pagination.match(/(\d)/)){
            return {
            code:401,
            status:"failed",
            data:{
                message:"pagination instead of the type numbers "
            }
            }
        }
        if(Number(pagination) > await maxPagination() || Number(pagination) <= 1){
        return {
            code:404,
            status:"failed",
            data:{
            message:"not found"
            }
        }
        }
        path += `/page/${pagination}`;
    }
    const content  = (await Anime.get(path)).data;
    const $ = cheerio.loadBuffer(Buffer.from(content));
    const load = $(".venz").children().eq(0);
    load.find("ul > li").each(function(){
        const item = $(this);
        const linkElement = item.find(".thumb > a");  
        const title = linkElement.find(".thumbz > h2").text();
        const thumb = linkElement.find(".thumbz > img").attr("src");
        const link = linkElement.attr("href");
        const id = link.replace(`https://otakudesu.cloud/anime/`, ""); 
        const uploaded_on = item.find(".newnime").text();
        const episode = item.find(".epz").text().trim();
        const day_updated = item.find(".epztipe").text().trim();
        
       animeCompleted.push({id,title,thumb,link,episode,day_updated,uploaded_on});

    });
    return {
        code:200,
        status:"success",
        data:animeCompleted
    }
}

export default Completed;