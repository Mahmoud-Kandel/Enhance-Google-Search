import axios from "axios";
import { mediaUrl } from ".";
import { IMedia, IMediaDetails, IModifiedMediaDetails } from "../@types";

/**
 * Fetches details of a media item asynchronously.
 *
 * @param {IMedia} media - The media item to fetch details for.
 * @returns {Promise<IModifiedMediaDetails>} A Promise resolving to the modified media details.
 *
 * This function makes an asynchronous HTTP GET request to fetch media details from the server using Axios.
 * Then, it categorizes the media based on its vote average:
 *   - If the vote average is greater than or equal to 8, the media is categorized as "verified".
 *   - If the vote average is greater than or equal to 6 but less than 8, the media is categorized as "community".
 *   - Otherwise, the media is categorized as "unverified".
 * Finally, it returns an object containing the fetched data along with the determined type.
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
