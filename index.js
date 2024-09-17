import Hapi from "@hapi/hapi";
import process from "node:process";
import Ongoing from "otakuanime/services/ongoing";

const initialization = async function () {
  const server = Hapi.server({
    port: 8000,
    host: "localhost"
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async function(){
      return await Ongoing();
    }
  });

  server.start();
  console.log(`Server running in port 8000`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

initialization();
