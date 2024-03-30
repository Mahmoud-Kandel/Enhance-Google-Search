import { MEDIA_CONSTANTS } from "../constants";

const {
    apiUrls: { movie, multi, tv },
} = MEDIA_CONSTANTS;

const mediaListUrl = (searchQuery: string): string => multi(searchQuery);

const mediaUrl = (mediaType: "movie" | "tv", id: number): string =>
    mediaType === "movie" ? movie(id) : tv(id);

export { mediaListUrl, mediaUrl };
