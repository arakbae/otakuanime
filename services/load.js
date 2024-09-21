import axios from "axios";
export const BaseUrl = "https://otakudesu.cloud";
class Load {
  constructor(url) {
    this.url = url;
  }

  async get(endpoint) {
    return await axios.get(`${this.url}/${endpoint}`,{headers:{
      "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0"
    }});
  }

  async post(endpoint, data) {
    return await axios.post(`${this.url}/${endpoint}`, data,{
    headers:{
       "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 Edg/128.0.0.0"
    }
    });
  }
}

const Anime = new Load(BaseUrl);

export { Anime};