import axios from "axios";
import { mediaListUrl, fetchMediaDetails } from ".";
import {
    APIResponse,
    TMDBList,
    IMediaDetails,
    IMedia,
    ExtensionSettings,
} from "../@types";

export const fetchMediaList = async (
    searchQuery: string,
    resultsPerPage: ExtensionSettings["resultsPerPage"]
): Promise<IMediaDetails[]> => {
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
