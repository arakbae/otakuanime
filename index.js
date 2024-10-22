import Hapi from "@hapi/hapi";
import process from "node:process";
import Ongoing from "otakuanime/services/ongoing";
import { Search } from "otakuanime/services/search";
import Genres, { Genre } from "otakuanime/services/genres";
import Completed from "otakuanime/services/completed";
import Detail from "otakuanime/services/detail";
import {getStreaming} from "otakuanime/services/episode";
import Joi from "joi";

const initialization = async function () {
  const server = Hapi.server({
    port: 3000,
    routes:{
      cors:true,
    }
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async function(request){
      if(request.query.pagination != undefined){
        return await Ongoing(request.query.pagination);
      }
      return await Ongoing(null);
    }
  });

  server.route({
    method:"GET",
    path:"/search",
    handler: async function (request) {
     return await Search(request.query.q); 
    }
  });

  server.route({
    method:"GET",
    path:"/completed",
    handler: async function (request) {
      if(request.query.pagination != undefined){
        return await Completed(request.query.pagination);
      }else{
        return await Completed(null);
      }
    }
  })

  server.route({
    method:"GET",
    path:"/genres",
    handler:async function(){
      return await Genres();
    }
  });

  server.route({
    method:"GET",
    path:"/genre",
    handler: async function (request) {
     if(request.query.name && request.query.page) {
      if(!request.query.page.match(/(\d)/)){
        return {
          code:401,
          status:"failed",
          data:{
            message:"query page instead of the type numbers"
          }
        }
      }
      return await Genre(request.query.name,request.query.page);
     }else{
      return await Genre(request.query.name,null);
     }
    }
  })

  server.route({
    method:"GET",
    path:"/episode/streaming/{episode_id}",
    handler:async function(request){
      return await getStreaming(request.params.episode_id);
    },
    options:{
      validate:{
        params:Joi.object({
          episode_id:Joi.required()
        })
      }
    }
  })

  server.route({
    method:"GET",
    path:"/detail",
    handler:async function (request) {
      if(request.query.id){
        return await Detail(request.query.id); 
      }else{
        return await Detail(null);
      }
    }
  })

  server.start();
  console.log(`Server running in port 3000`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

initialization();
