import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <span className="small-playlist-logo"></span>
                        {/* <img src="image link" alt="playlist 1 logo" /> */}
                    </div>
                    <div className="col-md-8">
                        <p>Playlist Name</p>
                    </div>
                </div>
            </div>,
            <div className="playlist" key="2">
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <span className="small-playlist-logo"></span>
                        {/* <img src="image line 2" alt="playlist 2 logo" /> */}
                    </div>
                    <div className="col-md-8">
                        <p>Playlist Name</p>
                    </div>
                </div>
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

    return (
        <div className="Home">
            <div className="container">
                <h1 className="text-center">Playlist Name</h1>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="w-75 py-2 px-3 m-auto card">
                            <span id="playlist-logo" style={{ backgroundImage: `url(${currentPlaylist})` }}></span>
                            <h2 className="text-center">Study Group</h2>
                            <hr />
                            <h3 className="text-center">Playlists</h3>
                            <div className="playlists">
                                {playlists}
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="w-75 py-2 px-3 m-auto">
                            <div style={{ position: "relative" }}>
                                <span id="album-logo" style={{ backgorundImage: `url(${currentAlbum})` }}></span>
                                <div style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)"}}>
                                    <button type="button" className="btn btn-none" onClick={e => upvote(currentAlbum, e)}>
                                        <FontAwesomeIcon icon="caret-up" />
                                    </button>
                                    <button type="button" className="btn btn-none" onClick={e => downvote(currentAlbum, e)}>
                                        <FontAwesomeIcon icon="caret-down" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-center">
                                <h3>{/* currentAlbum.songTitle */}Song Title</h3>
                                <h4>Song Album</h4>
                            </div>
                            <div className="row audio-controls align-items-center">
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
                                        <FontAwesomeIcon icon="forward-fast" />
                                    </span>
                                </div>
                            </div>
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