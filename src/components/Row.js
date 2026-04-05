import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import Modal from './Modal';
import "./Row.css";
import requests from "../requests";

const BASE_IMG_URL = "https://image.tmdb.org/t/p/original"

// Icons
const ListIcon = () => {
    return (
        <svg 
            width="800px"
            height="800px"
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            style={{width:"1.5em", height:"auto", paddingRight:"5px"}}
            >
                <path d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

const PlayIcon = () => {
    return (
        <svg 
            version="1.1"
            height="800px"
            width="800px" 
            viewBox="0 0 32 32" 
            fill="#ffffff"
            xmlns="http://www.w3.org/2000/svg" 
            style={{width:"1.5em", height:"auto", paddingRight:"5px"}}
        >
            <path d="M21.6,15.2l-9-7c-0.3-0.2-0.7-0.3-1.1-0.1C11.2,8.3,11,8.6,11,9v14c0,0.4,0.2,0.7,0.6,0.9C11.7,24,11.9,24,12,24
                c0.2,0,0.4-0.1,0.6-0.2l9-7c0.2-0.2,0.4-0.5,0.4-0.8S21.9,15.4,21.6,15.2z"/>
        </svg>
    )
}

// end Icons

function Row( { title, fetchUrl, isLarge, isSearch } ) {
    const [ movies, setMovies ] = useState([]);
    const [ selectedMovie, setSelectedMovie ] = useState([]);
    const [ movieVideos, setMovieVideos ] = useState([]);
    const [ videosExpanded, setVideosExpanded ] = useState(false);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ trailerAvailable, setTrailerAvailable ] = useState(false);
    const navigate = useNavigate(); 

    const initPlayer = () => {
        const trailerVideos = movieVideos.filter(function(video) {
            return video.type === "Trailer";
        })
        
        // if there are no available trailers
        if (trailerVideos.length < 1) {
            console.warn('trailerVideos is empty')
            return;
        }

        const video_id = movieVideos[ movieVideos.length - 1 ].key
        navigate(`/player?video_id=${video_id}`);
    }

    useEffect(() => {
        async function fetchData() {
            const req = await axios.get(fetchUrl);
            setMovies(req.data.results);
            return req;
        }
        fetchData();
    }, [fetchUrl])

    return (
        <div className={`row ${isSearch ? "searchResult" : ""}`}>
            <h2>{title}</h2>
            <div className="row_posters" style={{flexWrap: `${isSearch ? "wrap" : "unset"}`}}>
                {
                movies.map((movie) => {
                    if (movie.media_type === "person") {
                        return null;
                    }
                    
                    return (
                        <img
                            key={movie.id}
                            className={`row_poster ${isLarge && "row_posterLarge"}` }
                            src={ `${BASE_IMG_URL}${isLarge ? movie.poster_path : movie.backdrop_path }` }
                            alt={movie.name}
                            onClick={() => {
                                function checkForTrailers(videos) {
                                    const trailerVideos = videos.filter(function(video) {
                                        return video.type === "Trailer";
                                    })

                                    if (trailerVideos.length < 1) {
                                        setTrailerAvailable(false)
                                        return;
                                    }
                                    setTrailerAvailable(true)
                                }

                                async function fetchVideos(movie) {
                                    // movie-tv check
                                    // this looks a little cursed, but if it works it works am I right  
                                    const getMovie = await axios.get(requests.fetchVideos("movie", movie.id), {validateStatus:false})
                                    if (getMovie.status > 400) {
                                        const getTv = await axios.get(requests.fetchVideos("tv", movie.id), {validateStatus:false})
                                        if (getTv.status > 400) {
                                            setTrailerAvailable(false);
                                            return;
                                        }
                                        setMovieVideos(getTv.data.results);
                                        checkForTrailers(getTv.data.results);
                                        return;
                                    }
                                    setMovieVideos(getMovie.data.results);
                                    checkForTrailers(getMovie.data.results);
                                    return;
                                }
                                setSelectedMovie(movie);
                                fetchVideos(movie);  
                                setModalOpen(true);
                            }}
                        />
                    )
                }
                )
                }
            </div>
                <Modal open={modalOpen}
                
                onClose={() => {
                    setModalOpen(false)
                    setVideosExpanded(false)
                    setTrailerAvailable(false)
                    setMovieVideos([])
                    }}>
                    <div className="button_tabs">
                        <button className={`content_button ${trailerAvailable? "" : "disabled"}`} style={{marginTop:"5px"}} onClick={() => initPlayer()}><PlayIcon />Play Trailer</button>
                        <button className="content_button" style={{borderBottomLeftRadius:"0", borderBottomRightRadius:"0"}} 
                        onClick={() => {
                            setVideosExpanded(!videosExpanded);
                        }}><ListIcon />Video List</button>
                        <div className={`video_list ${videosExpanded? "expanded" : ""}`}>
                            <ul>
                                {movieVideos.map((video) => (
                                    <li>
                                        <a target="_blank" rel="noreferrer" href={`https://youtu.be/${video.key}`}>{video.name}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="content_area">
                        <img
                            src={ `${BASE_IMG_URL}${selectedMovie.backdrop_path}` }
                            style={
                                {width:"100%", height:"auto"}
                            }
                            alt={"Movie Backdrop"}
                        />
                        <div className="modal_img_fade"></div>
                        <h2>{selectedMovie.name || selectedMovie.title}</h2>
                        <p>{selectedMovie.overview}</p>
                    </div>
                </Modal>
        </div>
    )
}

export default Row;