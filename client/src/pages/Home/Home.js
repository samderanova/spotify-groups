import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Home.css';

function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylistLogo, setCurrentPlaylistLogo] = useState('');
    const [currentAlbumLogo, setCurrentAlbumLogo] = useState('');
    const [currentSongTitle, setCurrentSongTitle] = useState('');
    const [queue, setQueue] = useState([]);
    
    useEffect(() => {
        // fetch().then(res => {}).catch(err => console.error(err));
        setCurrentPlaylistLogo('test');
        setCurrentAlbumLogo('test2');
        setCurrentSongTitle('Song Title');
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
    return (
        <div className="Home">
            <div className="container">
                <h1 className="text-center">Playlist Name</h1>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="w-75 py-2 px-3 m-auto card">
                            <span id="playlist-logo" style={{ backgroundImage: `url(${currentPlaylistLogo})` }}></span>
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
                            <div className="row align-items-center gx-0">
                                <div className="col-md-11 p-0">
                                    <span id="album-logo" style={{ backgorundImage: `url(${currentAlbumLogo})` }}></span>
                                </div>
                                <div className="col-md-1 p-0">
                                    <button type="button" className="btn btn-none"onClick={() => {}}>
                                        <FontAwesomeIcon icon="caret-up" />
                                    </button>
                                    <button type="button" className="btn btn-none"onClick={() => {}}>
                                        <FontAwesomeIcon icon="caret-down" />
                                    </button>
                                </div>
                            </div>
                            <h3 className="text-center">{currentSongTitle}</h3>
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