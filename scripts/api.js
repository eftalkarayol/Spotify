import { renderSongs } from "./ui.js";

// yapılan istekler için kullanılan yarlar
const url =
  "https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "2c03ac69fdmshd7b01af13a6d801p1f965ejsnf7a3e83148c4",
    "X-RapidAPI-Host": "shazam.p.rapidapi.com",
  },
};

// api isteklerini yönettiğimiz class
export class API {
  constructor() {
    this.songs = [];
  }
  async getPopular() {
    const res = await fetch(url, options);
    const data = await res.json();

    this.songs = data.tracks;
    // ekrana popüler müzikleri listeler
    renderSongs(this.songs);
  }

  // arama metodu
  async searchMusic(query) {
    const res = await fetch(
      `https://shazam.p.rapidapi.com/search?term=${query}&locale=en-US`,
      options
    );
    const data = await res.json();
    // veriyi sitediğimiz hale çevirme
    // song.track yerine song'a erişince
    const newData = data.tracks.hits.map((song) => ({
      ...song.track,
    }));
    this.songs = newData;

    // aratılan şarkıları ekrana basma
    renderSongs(this.songs);
  }
}
