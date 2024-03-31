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
 * Fetches a list of media items asynchronously based on a search query.
 *
 * @param {string} searchQuery - The search query for filtering media items.
 * @param {ExtensionSettings["resultsPerPage"]} resultsPerPage - The number of results per page.
 * @returns {Promise<IModifiedMediaDetails[]>} A Promise resolving to an array of modified media details.
 *
 * This function makes an asynchronous HTTP GET request to fetch a list of media items from the server using Axios.
 * It filters the fetched data to include only media items that meet certain criteria:
 *   - Must be of type "tv" or "movie".
 *   - Must have a non-empty overview.
 *   - Must have a non-empty backdrop_path or poster_path.
 * For each filtered media item, it fetches its details using the fetchMediaDetails function.
 * It further filters the fetched media details to include only items with a non-empty homepage.
 * Finally, it returns an array of modified media details, limited to the specified number of results per page.
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
            if (media.homepage && media.homepage?.length > 0) {
                return media;
            } else {
                return false;
            }
        })
        .slice(0, resultsPerPage);

    return modifiedMediaDetailsList;
};
