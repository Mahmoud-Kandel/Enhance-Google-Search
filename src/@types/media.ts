export interface IMedia {
    id: number;
    adult: boolean;
    poster_path: string;
    backdrop_path?: string;
    original_language: string;
    overview?: string;
    genre_ids: number[];
    popularity: number;
    vote_average: number;
    vote_count: number;
    media_type: "tv" | "movie" | "person";
    original_name?: string;
    name?: string;
    origin_country?: string[];
    first_air_date?: string;
    title?: string;
    original_title?: string;
    video?: boolean;
    release_date?: string;
}

export type TMDBList = Array<IMedia>;
