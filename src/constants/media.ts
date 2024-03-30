const apiKey = import.meta.env.VITE_API_KEY;

const MEDIA_CONSTANTS = {
    apiKey,
    apiImageUrl: "https://image.tmdb.org/t/p/original/",
    resultsPerPage: 3,
    apiUrls: {
        movie: (id: number) =>
            `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`,
        tv: (id: number) =>
            `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`,
        multi: (query: string) =>
            `https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&language=en-US&include_adult=false&query=${query}`,
    },
};

const IMDB_DATA = {
    name: "IMDB",
    url: `https://www.imdb.com`,
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAqFBMVEUiIiIACiEZGyINFSISFyIADyEcHiLVrytWSiTRrCuoiyleUCSIciaykym/nio9NiP2yi71yS7twi3yxy6ZfyjJpStHPiMAACHnvi2hhihkVSWOdifhuS1qWSXDoSpyYCV5ZSZNQyQAABgbGxtubm4VFRVeXl40NDQdHR1UVFRNTU1FRUUAAADl5eWoqKhnZ2ctLS17e3sPDw+enp66urqPj4+9vb2YmJixNFOsAAABAUlEQVR4AWIYegDABV0YMRACAQAc3A+5J+7995h3xWFxQighrMtcECKoJGQ1rpRWxjqlfDAGXFRGLMhSdrkoj9hUNFhOqZyFnDGjw3K59phvpetc7nCSG3yU+ujx2WMx+SVWzLWUuuDlmSvZYLigzQu+d5iCwqZHd1yZUoeQP6mp+ED8pgLLmRTgC94HDZ8mQLhFuIb6nd/yE/LHeV+w4YcEE23zQ0EAMAx6lrnCfP2T3YUIx13eP7mQXGnDjZXcec3NQiBEFaLVIgAmm9ErSZIFqmqqYR+29ZzrVJwmJ+TcA0CoPVfoSJKy+4l+gq97TrgKmi6VpnBTyk5SHsbyV9gAB30gcyLVAT0AAAAASUVORK5CYII=",
};

const CONTAINER_CLASS = "search-results";

export { CONTAINER_CLASS, IMDB_DATA, MEDIA_CONSTANTS };
