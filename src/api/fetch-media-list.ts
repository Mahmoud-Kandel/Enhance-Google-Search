import axios from "axios";
import { BaseURL } from ".";
import { APIResponse, IMedia, TMDBList } from "../@types";
import { MEDIA_CONSTANTS } from "../constants";

export const fetchMediaList = async (
    searchQuery: string
): Promise<IMedia[]> => {
    const { data } = await axios.get<APIResponse<TMDBList>>(
        BaseURL(searchQuery)
    );

    const modifiedData = data.results
        .filter((media) => {
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
        })
        .slice(0, MEDIA_CONSTANTS.resultsPerPage);

    return modifiedData;
};
