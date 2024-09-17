import axios from "axios";

class Load {
  constructor(url) {
    this.url = url;
  }

  async get(endpoint) {
    return await axios.get(`${this.url}/${endpoint}`);
  }

  async post(endpoint, data) {
    return await axios.post(`${this.url}/${endpoint}`, data);
  }
}

const Anime = new Load("https://otakudesu.cloud");

export { Anime};