import axios from 'axios';
import i18n from "@/i18n";

export async function pexelImages(params) {
  const keyphrase = params.keyphrase || 'random',
    page = params.page || 1,
    per_page = params.per_page || 15;

  // API request to Pexels
  const url = `https://api.pexels.com/v1/search?query=${keyphrase}&page=${page}&per_page=${per_page}&orientation=landscape&size=large`;

  const instance = axios.create({
    headers: { 'Authorization': import.meta.env.VITE_PEXELS_API_KEY }
  });

  const { data } = await instance.get(url);
  return data;
}

export function getImageContainerHtml(imgHTML, photographer) {
  const aTag = document.createElement("a");
  aTag.setAttribute('href', "https://www.pexels.com/");
  aTag.setAttribute('target', "_blank");
  aTag.setAttribute('rel', "nofollow noopener noreferrer");
  aTag.appendChild(document.createTextNode('Pexels'));
  
  const italicTag = document.createElement("em");
  italicTag.setAttribute('style', "font-size: 10pt;")
  italicTag.innerText = `${i18n.t('Photo by')} ${photographer} ${i18n.t('on')} `;
  italicTag.appendChild(aTag);

  const childDiv = document.createElement("div");
  childDiv.appendChild(italicTag);
  
  const mainDiv = document.createElement("div");
  mainDiv.innerHTML = imgHTML;
  mainDiv.appendChild(childDiv);
  
  return mainDiv.outerHTML;
}
