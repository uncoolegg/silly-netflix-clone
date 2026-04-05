const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const fetchVideos = (type, id) => {
    return `/${type}/${id}/videos?api_key=${API_KEY}`
}

// not sure if include_adult should be omitted
const searchMoviesOrShows = (query) => {
    return encodeURI(`/search/multi?api_key=${API_KEY}&include_adult=true&query=${query}`)
}

const requests = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchVideos:fetchVideos,
    searchMoviesOrShows:searchMoviesOrShows,
};

export default requests;