import { IModifiedMediaDetails } from "../../@types";
import { MEDIA_CONSTANTS, IMDB_DATA } from "../../constants";
import { prepareLink } from "../../utils";

/**
 * Generates HTML content for a result card based on the provided media details.
 *
 * @param {IModifiedMediaDetails} media The media details used to populate the card.
 * @returns {string} HTML content representing the result card.
 */
export const resultCard = (media: IModifiedMediaDetails): string => {
    const {
        poster_path,
        backdrop_path,
        original_name,
        name,
        original_title,
        title,
        overview,
        homepage,
        type,
    } = media;

    const { origin, firstBreadCramp, secondBreadCramp } = prepareLink(homepage);

    const mediaData = {
        image: MEDIA_CONSTANTS.apiImageUrl + poster_path || backdrop_path,
        title: original_name || name || original_title || title,
        overview: overview?.substring(0, 120) + "..." || "",
        url: {
            websiteLink: homepage,
            origin,
            firstBreadCramp,
            secondBreadCramp,
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
                     <span dir="ltr">${mediaData.url.origin}</span>
                     ${
                         mediaData.url.firstBreadCramp
                             ? `<span class="ylgVCe ob9lvb" role="text">
                           ›
                           <span dir="ltr">${
                               mediaData.url.firstBreadCramp
                           }</span>
                           ${
                               mediaData.url.secondBreadCramp
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
            <div class='card_description--type'>
               <div class='card_description--type--icon type-${type}'></div>
               <div>${type}</div>
         </div>
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
