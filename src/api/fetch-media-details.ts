import axios from "axios";
import { mediaUrl } from ".";
import { IMedia, IMediaDetails } from "../@types";

export const fetchMediaDetails = async (
    media: IMedia
): Promise<IMediaDetails> => {
    const { data } = await axios.get<IMediaDetails>(
        mediaUrl(media.media_type, media.id)
    );

    return data;
};
