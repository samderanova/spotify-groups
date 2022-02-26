import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import './Home.css';

// const socket = io('http://localhost:5000');

// io.on('connection', socket => {

// })

function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState('');
    const [currentAlbum, setCurrentAlbum] = useState('');
    const [queue, setQueue] = useState([]);
    const [playPauseIcon, setPlayPauseIcon] = useState('fa-play');
    const [value, setValue] = React.useState(10);

    const changeVolume = (event, newValue) => {
        setValue(newValue);
      };
    
    useEffect(() => {
        // fetch().then(res => {}).catch(err => console.error(err));
        setCurrentPlaylist('test');
        setCurrentAlbum('test2');
        setQueue([
            <div className="queue">
                <div className="card" key="1">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <span className="small-playlist-logo"></span>
                        </div>
                        <div className="col-md-8">
                            <p>Song 1</p>
                        </div>
                    </div>
                </div>
                <div className="card" key="2">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <span className="small-playlist-logo"></span>
                        </div>
                        <div className="col-md-8">
                            <p>Song 2</p>
                        </div>
                    </div>
                </div>
            </div>
        ])
        setPlaylists([
            <div className="playlist" key="1">
                <span className="small-playlist-logo"></span>
                {/* <img src="image link" alt="playlist 1 logo" /> */}
                <p className="playlist-name">Playlist Name</p>
            </div>,
            <div className="playlist" key="2">
                <span className="small-playlist-logo"></span>
                {/* <img src="image line 2" alt="playlist 2 logo" /> */}
                <p className="playlist-name">Playlist Name</p>
            </div>
        ]);
    }, []);

    function upvote(currentSong, event) {

    }

    function downvote(currentSong, event) {

    }

    function playPause(event) {
        if (playPauseIcon === 'play') {
            setPlayPauseIcon('pause');            
        }
        else {
            setPlayPauseIcon('play');
        }
    }
    

    // function slide(event) {
    //     var slider = document.getElementById("myRange");
    //     var output = document.getElementById("demo");
    //     output.innerHTML = slider.value; // Display the default slider value
    //     // Update the current slider value (each time you drag the slider handle)
    //     slider.oninput = function() {
    //     output.innerHTML = this.value;
    //     } 
    // }


    return (
        <div className="Home">
            <div className="container">
                <h1 className="text-center">Playlist Name</h1>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="widget-decoration"></div>
                        <div className="w-75 py-2 px-3 m-auto gen-widget">
                            <span id="playlist-logo" style={{ backgroundImage: `url(${currentPlaylist})` }}></span>
                            <h2 className="text-center" id="group-name">Study Group</h2>
                            <h3 className="text-center" id="group-playlists-header">Playlists</h3>
                            <div className="playlists">
                                {playlists}
                            </div>
                        </div>
                    </div>

                    {/* MAIN PLAYER */}
                    <div className="col-lg-4">
                        <div id="player-top-container" className="row py-2 px-3 m-auto">

                            <div style={{ position: "relative" }}>
                                <div class="row">

                                    <span id="album-logo" style={{ backgorundImage: `url(${currentAlbum})` }}></span>

                                    <div style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)"}}>
                                        <button className="btn" onClick={e => upvote(currentAlbum, e)}>
                                            <i className="vote fa-solid fa-caret-up"></i>
                                        </button>
                                        <button className="btn" onClick={e => downvote(currentAlbum, e)}>
                                            <i className="vote fa-solid fa-caret-down"></i>
                                        </button>
                                    </div>
        
                                </div>
                            </div>

                            <div id="song-details" className="text-center">
                                <h4>{/* currentAlbum.songTitle */}Song Title</h4>
                                <h5>Song Album</h5>
                            </div>

                            <div id="slider-row" class="row">
                                <div id="song-name-tag" class="col-lg-6">
                                    <h5>Name's choice</h5>
                                </div>
                                <div class="col-lg-6">
                                    <Slider value={value} onChange={changeVolume}/>
                                </div>
                            </div>

                        </div>

                        <div id="player-bottom-container" className="w-75 py-2 px-3 m-auto">
                            <div id="player-buttons" className="row audio-controls align-items-center">
                                <div className="col-md-4">
                                    <span>
                                        <i className="fa-solid fa-backward-fast"></i>
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <span className="small-playlist-logo" onClick={playPause} style={{ position: "relative" }}>
                                        <i className={`fa-solid ${playPauseIcon}`} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}></i>
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <span>
                                        <i className="fa-solid fa-forward-fast"></i>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div id="queue-button-div" className="row align-items-center">
                            <button id="queue-button">Queue song</button>
                        </div>

                    </div>



                    <div className="col-lg-4">
                        <div className="w-75 py-2 px-3 mb-5 m-auto card">
                            <h2>Queue:</h2>
                            {queue}
                        </div>
                        <div className="w-75 py-2 px-3 m-auto card">
                            <h2>Listening Now:</h2>
                            <ul>
                                <li>Person 1</li>
                                <li>Person 2</li>
                                <li>Person 3</li>
                                <li>Person 4</li>
                                <li>Person 5</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Home;