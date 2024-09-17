import { Anime } from "otakuanime/services/load";
import * as cheerio  from "cheerio";


const Ongoing = async () => {
  const animeOngoing = [];
  await Anime.get("ongoing-anime").then(({data})=>{ 
  const $ = cheerio.load(data);
  const load = $('.venz').children().eq(0);
  load.find("ul > li").each(function () {
    const item = $(this);
    const linkElement = item.find(".thumb > a");  
    const title = linkElement.find(".thumbz > h2").text();
    const thumb = linkElement.find(".thumbz > img").attr("src");
    const link = linkElement.attr("href");
    const id = link.replace(`https://otakudesu.cloud/anime/`, ""); 
    const uploaded_on = item.find(".newnime").text();
    const episode = item.find(".epz").text().trim();
    const day_updated = item.find(".epztipe").text().trim();

    animeOngoing.push({id,title,thumb,link,episode,day_updated,uploaded_on});
  });

  });
  return {
    code:200,
    status:"success",
    data:animeOngoing
  };
}



export default Ongoing;
