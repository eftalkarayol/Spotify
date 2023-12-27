import { API } from "./scripts/api.js";
import { elements, renderPlayingInfo, updateTitle } from "./scripts/ui.js";

// api class'ında örnek oluşturma
const api = new API();

// sayfa yüklendiği anda qpi'a istek atıp popüler müzikleri listeler
document.addEventListener(
  "DOMContentLoaded",
  async () => await api.getPopular()
);

// parametre olarak aldığı müziği çalar
const playMusic = (url) => {
  // müziğin url'ini html'e aktarma
  elements.audioSource.src = url;

  // audio elementinin müziği yüklemesini sağladık
  elements.audio.load();
  // müziği oynatır
  elements.audio.play();
};

// listede tıklamalarda çalışır
const handleClick = (e) => {
  if (e.target.id === "play-btn") {
    // kapsayıcı kart elemanına erişme
    const parent = e.target.closest(".card");
    // çalınacak müziğin bilgilerini ekrana basar
    renderPlayingInfo(parent.dataset);
    // müziği çalar
    playMusic(parent.dataset.url);
  }
};

// liste alanındaki tıklamaları izleme

document.addEventListener("click", handleClick);

// form olaylarını izleme
elements.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = e.target[0].value;
  if (!query) return;

  // başlığı güncelle
  updateTitle(`${query} İçin Sonuçlar`);

  //aratılan kelimeyle eşleşen müzikleri çeker
  api.searchMusic(query);
});
