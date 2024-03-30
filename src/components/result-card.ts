import { IMedia } from "../@types";
import { MEDIA_CONSTANTS } from "../constants";

export const resultCard = (media: IMedia): string => {
    const {
        poster_path,
        backdrop_path,
        original_name,
        name,
        original_title,
        title,
        overview,
    } = media;

    const mediaData = {
        image: MEDIA_CONSTANTS.apiImageUrl + poster_path || backdrop_path,
        title: original_name || name || original_title || title,
        overview: overview?.substring(0, 120) + "..." || "",
    };

    const baseWebsite = {
        name: "IMDB",
        url: `https://www.imdb.com`,
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAqFBMVEUiIiIACiEZGyINFSISFyIADyEcHiLVrytWSiTRrCuoiyleUCSIciaykym/nio9NiP2yi71yS7twi3yxy6ZfyjJpStHPiMAACHnvi2hhihkVSWOdifhuS1qWSXDoSpyYCV5ZSZNQyQAABgbGxtubm4VFRVeXl40NDQdHR1UVFRNTU1FRUUAAADl5eWoqKhnZ2ctLS17e3sPDw+enp66urqPj4+9vb2YmJixNFOsAAABAUlEQVR4AWIYegDABV0YMRACAQAc3A+5J+7995h3xWFxQighrMtcECKoJGQ1rpRWxjqlfDAGXFRGLMhSdrkoj9hUNFhOqZyFnDGjw3K59phvpetc7nCSG3yU+ujx2WMx+SVWzLWUuuDlmSvZYLigzQu+d5iCwqZHd1yZUoeQP6mp+ED8pgLLmRTgC94HDZ8mQLhFuIb6nd/yE/LHeV+w4YcEE23zQ0EAMAx6lrnCfP2T3YUIx13eP7mQXGnDjZXcec3NQiBEFaLVIgAmm9ErSZIFqmqqYR+29ZzrVJwmJ+TcA0CoPVfoSJKy+4l+gq97TrgKmi6VpnBTyk5SHsbyV9gAB30gcyLVAT0AAAAASUVORK5CYII=",
    };

    return `
   <div class="card">
      <div class="card_content">
         <a href="${baseWebsite.url}" class="card_content-header">
            <div class="card_header-icon_container">
               <img
                  class="card_header-icon_container-image"
                  src="${baseWebsite.icon}"
                  alt="${baseWebsite.name}"
               />
            </div>
            <div class="card_header-Content">
               <span class="card_header-Content--header">${baseWebsite.name}</span>
               <div class="card_header-Content--content">
                  <cite>
                     <span dir="ltr">${baseWebsite.url}</span>
                     <span class="ylgVCe ob9lvb" role="text">
                        ›
                        <span dir="ltr">${baseWebsite.name}</span>
                        › ${mediaData.title}
                     </span>
                  </cite>
               </div>
            </div>
         </a>
         <a class="card_header-title" href="${baseWebsite.url}">${mediaData.title}</a>
         <div class="card_header-description">
            <span>${mediaData.overview}</span>
         </div>
      </div>
      <a href="${baseWebsite.url}" class="card_image_container">
         <img
            class="card_image_container-image"
            src="${mediaData.image}"
            alt="${mediaData.title}"
         />
      </a>
   </div>
   `;
};
