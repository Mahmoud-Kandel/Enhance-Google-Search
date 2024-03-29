// API key obtained from environment variables
const API_KEY = import.meta.env.VITE_API_KEY;
// The TMDb API URL
const api_url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&include_adult=false&query=`;

/**
 * Base URL for making requests to The Movie Database (TMDb) API.
 * @param searchQuery The search query string.
 * @returns The complete URL for making API requests.
 */
export const BaseURL = (searchQuery: string): string => api_url + searchQuery;
