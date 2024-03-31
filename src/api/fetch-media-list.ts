import axios from "axios";
import { mediaListUrl, fetchMediaDetails } from ".";
import {
    APIResponse,
    TMDBList,
    IMedia,
    ExtensionSettings,
    IModifiedMediaDetails,
} from "../@types";

/**
 * Fetches and modifies a list of media based on the provided search query and results per page.
 *
 * @param {string} searchQuery The search query used to fetch media list.
 * @param {ExtensionSettings["resultsPerPage"]} resultsPerPage The number of results.
 * @returns {Promise<IModifiedMediaDetails[]>} A promise resolving to the modified list of media details.
 */
export const fetchMediaList = async (
    searchQuery: string,
    resultsPerPage: ExtensionSettings["resultsPerPage"]
): Promise<IModifiedMediaDetails[]> => {
    const { data } = await axios.get<APIResponse<TMDBList>>(
        mediaListUrl(searchQuery)
    );

    const modifiedData: IMedia[] = data.results.filter((media) => {
        const { media_type, overview, backdrop_path, poster_path } = media;
        if (
            (media_type === "tv" || media_type === "movie") &&
            overview &&
            overview?.length > 0 &&
            ((backdrop_path && backdrop_path?.length > 0) ||
                (poster_path && poster_path?.length > 0))
        ) {
            return media;
        } else {
            return false;
        }
    });

    const mediaDetailsList = await Promise.all(
        modifiedData.map(async (media) => await fetchMediaDetails(media))
    );

    const modifiedMediaDetailsList = mediaDetailsList
        .filter((media) => {
            const { homepage, poster_path, backdrop_path } = media;
            if (
                homepage &&
                homepage?.length > 0 &&
                (poster_path || backdrop_path)
            ) {
                return media;
            } else {
                return false;
            }
        })
        .slice(0, resultsPerPage);

    return modifiedMediaDetailsList;
};
