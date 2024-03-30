import { MEDIA_CONSTANTS } from "../constants";

const api_url = `https://api.themoviedb.org/3/search/multi?api_key=${MEDIA_CONSTANTS.apiKey}&language=en-US&include_adult=false&query=`;

/**
 * Base URL for making requests to The Movie Database (TMDb) API.
 * @param searchQuery The search query string.
 * @returns The complete URL for making API requests.
 */
export const BaseURL = (searchQuery: string): string => api_url + searchQuery;
