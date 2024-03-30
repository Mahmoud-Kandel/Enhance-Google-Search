import { IMediaDetails } from "../@types";
import { MEDIA_CONSTANTS, IMDB_DATA } from "../constants";
import { prepareLink } from "../utils";

export const resultCard = (media: IMediaDetails): string => {
    const {
        poster_path,
        backdrop_path,
        original_name,
        name,
        original_title,
        title,
        overview,
        homepage,
    } = media;

    const mediaData = {
        image: MEDIA_CONSTANTS.apiImageUrl + poster_path || backdrop_path,
        title: original_name || name || original_title || title,
        overview: overview?.substring(0, 120) + "..." || "",
        url: {
            websiteLink: homepage,
            main: prepareLink(homepage, 0, 3, "main"),
            secondary: prepareLink(homepage, 3, 4, "secondary"),
            tertiary: prepareLink(homepage, 4, 5, "tertiary"),
        },
    };

    return `
   <div class="card">
      <div class="card_content">
         <a href="${mediaData.url.websiteLink}" class="card_content-header">
            <div class="card_header-icon_container">
               <img
                  class="card_header-icon_container-image"
                  src="${IMDB_DATA.icon}"
                  alt="${IMDB_DATA.name}"
               />
            </div>
            <div class="card_header-Content">
               <span class="card_header-Content--header">${
                   IMDB_DATA.name
               }</span>
               <div class="card_header-Content--content">
                  <cite>
                     <span dir="ltr">${mediaData.url.main}</span>
                     ${
                         mediaData.url.secondary
                             ? `<span class="ylgVCe ob9lvb" role="text">
                           ›
                           <span dir="ltr">${mediaData.url.secondary}</span>
                           ${
                               mediaData.url.tertiary
                                   ? `
                           › ${mediaData.title}
                           `
                                   : ""
                           }
                        </span>`
                             : ""
                     }
                  </cite>
               </div>
            </div>
         </a>
         <a class="card_header-title" href="${mediaData.url.websiteLink}">${
        mediaData.title
    }</a>
         <div class="card_header-description">
            <span>${mediaData.overview}</span>
         </div>
      </div>
      <a href="${mediaData.url.websiteLink}" class="card_image_container">
         <img
            class="card_image_container-image"
            src="${mediaData.image}"
            alt="${mediaData.title}"
         />
      </a>
   </div>
   `;
};
