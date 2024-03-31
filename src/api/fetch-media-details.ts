import axios from "axios";
import { mediaUrl } from ".";
import { IMedia, IMediaDetails, IModifiedMediaDetails } from "../@types";

/**
 * Fetches and modifies media details based on the provided media object.
 *
 * @param {IMedia} media The media object containing type and ID.
 * @returns {Promise<IModifiedMediaDetails>} A promise resolving to the modified media details.
 */
export const fetchMediaDetails = async (
    media: IMedia
): Promise<IModifiedMediaDetails> => {
    const { data } = await axios.get<IMediaDetails>(
        mediaUrl(media.media_type, media.id)
    );

    let type: IModifiedMediaDetails["type"] = "unverified ";
    if (data.vote_average >= 8) {
        type = "verified";
    } else if (data.vote_average >= 6) {
        type = "community";
    }

    return { ...data, type };
};
