import { IMedia } from ".";

export interface IMediaDetails extends Omit<IMedia, "media_type"> {
    genres: { id: number; name: string }[];
    homepage: string;
    imdb_id: string;
    production_companies: {
        id: number;
        logo_path: null | string;
        name: string;
        origin_country: string;
    }[];
    production_countries: { iso_3166_1: string; name: string }[];
    runtime: number;
    spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
    }[];
    status: string;
    episode_run_time?: [number];
    number_of_episodes?: number;
    number_of_seasons?: number;
    seasons?: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
    }[];
}

export interface IModifiedMediaDetails extends IMediaDetails {
    type: "community" | "verified" | "unverified ";
}
