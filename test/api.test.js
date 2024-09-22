import Ongoing from "../services/ongoing.js";
import { Search } from "../services/search.js";
import Completed from "../services/completed.js";
import Genres from "../services/genres.js";
import Detail from "../services/detail.js";

describe("Ongoing Anime !",function(){
    it("Should be response code equals to 200",async ()=>{
        const response = await Ongoing();
        expect(response.code).toBe(200);
    });
});

describe("Searching Anime !",function(){
    it("Should be response code equals to 200",async ()=>{
        const response = await Search("One Piece");
        expect(response.code).toBe(200);
    });

    it("Should be an empty query then response code is equal to 404",async function(){
        const response = await Search("");
        expect(response.code).toBe(404);
    })
});

describe("Anime Completed !",function(){
    it("Should be response code equals to 200",async function(){
       const response = await Completed(null);
       expect(response.code).toBe(200);
    });
});

describe("Anime Gendres !",function(){
    it("Should be response code equals to 200",async function(){
        const response = await Genres();
        expect(response.code).toBe(200);
    });
});

describe("Anime Detail !",function(){
    it("Should be response code equals to 200",async function () {
      const response = await Detail("1piece-sub-indo");
      expect(response.code).toBe(200);
    });

    it("Should be response code equals to 404",async function(){
        const response = await Detail(null);
        expect(response.code).toBe(404);
    });
})