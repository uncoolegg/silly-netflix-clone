import React from 'react'
import { useSearchParams } from 'react-router-dom';
import './VideoPlayer.css'

function VideoPlayer() {
    function LoadPlayer() {
        let [searchParams] = useSearchParams();
        return (
            <iframe 
                title="videoplayer"
                className='video_frame'
                src={`https://www.youtube.com/embed/${searchParams.get("video_id")}`}
            >
            </iframe>
        )
    }
    return (
    <div className="video_area">
        {LoadPlayer()}
        <p className="marquee"><span>                                       THIS FEATURE IS INCOMPLETE AND IS NOT FINAL.                                    WHAT YOU SEE CURRENTLY MAY BE COMPLETELY DIFFERENT IN THE FUTURE.                                        </span></p>
    </div>
    )
}

export default VideoPlayer;