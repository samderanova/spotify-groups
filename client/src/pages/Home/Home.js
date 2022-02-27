import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from '@material-ui/core/Slider';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './Home.css';


function Home() {
    const [playlists, setPlaylists] = useState([]);
    const [currentPlaylist, setCurrentPlaylist] = useState('');
    const [currentAlbum, setCurrentAlbum] = useState('');
    const [queue, setQueue] = useState([]);
    const [playPauseIcon, setPlayPauseIcon] = useState('fa-play');
    const [value, setValue] = useState(10);

    var r = document.querySelector(':root');
    var rs = getComputedStyle(r);
    r.style.setProperty('--color1', 'red');

    const colorDict = {1: {'color1':'#464C89', 'color2': '#CA95D7', 'color3': '#EFD8EB', 'color4': '#BEE1E6',
                            'color5': '#C9FBD4', 'color6': '#4B8581', 'color7': '#FFFBEF'}};

    var paletteNum = 1;
    var currColor1 = colorDict[paletteNum]['color1'];
    var currColor2 = colorDict[paletteNum]['color2'];
    var currColor3 = colorDict[paletteNum]['color3'];
    var currColor4 = colorDict[paletteNum]['color4'];
    var currColor5 = colorDict[paletteNum]['color5'];
    var currColor6 = colorDict[paletteNum]['color6'];
    var currColor7 = colorDict[paletteNum]['color7'];

    const changeVolume = (event, newValue) => {
        setValue(newValue);
    };
    
    useEffect(() => {
        // fetch().then(res => {}).catch(err => console.error(err));

        setCurrentPlaylist('test');
        setCurrentAlbum('test2');
        setQueue([
            <div className="queue" id="queue-songs">
                <div key="1" className="queue-song">
                    <span className="small-playlist-logo queue-logo"></span>
                    <p className="queue-names">Song 1</p>
                    <div className="requester-opts">
                        <i className="fa-solid fa-ellipsis queue-dots"></i>
                        <p class="queue-requester">User name</p>
                    </div>
                </div>
                <div key="2" className="queue-song">
                    <span className="small-playlist-logo queue-logo"></span>
                    <p className="queue-names">Song 2</p>
                    <div className="requester-opts">
                        <i className="fa-solid fa-ellipsis queue-dots"></i>
                        <p className="queue-requester">User name</p>
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




    return (
        <div className="Home">
            <div className="container">
                <div id="home-top-spacing"></div>
                <h1 className="text-center">Playlist Name</h1>
                <Link to="/room">Create Room</Link>
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
                        <div className="widget-decoration" id="player-widget-decor">
                            <p id="playlist-name">Playlist Name</p>
                        </div>
                        <div id="player-top-container" className="row py-2 px-3 m-auto">

                            <div style={{ position: "relative" }}>
                                <div className="row" id="album-logo-vote">

                                    <span id="album-logo" style={{ backgroundImage: `url(${currentAlbum})` }}></span>

                                    {/* <div style={{ position: "absolute", left: "100%", top: "50%", transform: "translateY(-50%)"}}> */}
                                    <div id="vote-btns">
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

                            <div id="slider-row" className="row">
                                <div id="song-name-tag" className="col-lg-6">
                                    <h5>Name's choice</h5>
                                </div>
                                <div className="col-lg-6" id="vol-slider">
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
                                    <span className="small-playlist-logo" onClick={playPause} style={{ position: "relative" }} id="play-pause-btn">
                                        <i className={`fa-solid ${playPauseIcon}`} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} id="play-pause-btn"></i>
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <span>
                                        <i className="fa-solid fa-forward-fast"></i>
                                    </span>
                                </div>
                            </div>

                            <div id="queue-button-div" className="row align-items-center">
                                <Popup trigger={<button id="queue-button">Queue song</button>}
                                position="top center">
                                <div id="queue-button-popup">
                                    <h3 id="your-playlists">Your Playlists</h3>

                                    <Popup trigger={<button class="playlist-button">Playlist name</button>}
                                    position="right center">
                                        <div class="songs-popup">
                                            <h5 class="playlist-songs">Playlist name songs</h5>
                                            {/* onclick function for these buttons will add them to the queue */}
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                            <button class="song-button">Song name</button>
                                        </div>
                                    </Popup>

                                    <button class="playlist-button">Playlist name</button>
                                    <button class="playlist-button">Playlist name</button>
                                    <button class="playlist-button">Playlist name</button>
                                    <button class="playlist-button">Playlist name</button>
                                </div>
                                </Popup>

                                

                            </div>

                        </div>


                    </div>



                    <div className="col-lg-4">
                        <div className="widget-decoration" id="queue-widget-decor">
                            <p id="queue-name">Queue</p>
                        </div>
                        <div className="w-75 py-2 px-3 mb-5 m-auto  gen-widget">
                            {queue}
                            <div id="queue-bottom-bar">
                                <div id="switch-queue-pages">
                                    <button className="btn" onClick={e => upvote(currentAlbum, e)}>
                                        <i className="switch-queue fa-solid fa-caret-up"></i>
                                    </button>
                                    <button className="btn" onClick={e => downvote(currentAlbum, e)}>
                                        <i className="switch-queue fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="widget-decoration" id="listening-widget-decor">
                            <p id="listening-name">Listening Now</p>
                        </div>
                        <div className="w-75 py-2 px-3 m-auto gen-widget">
                            <div id="listening-people" >
                                <div class="listening-person">
                                    <span className="small-playlist-logo"></span>
                                    <p className="person-name">Person 1</p>
                                </div>
                                <div class="listening-person">
                                <span className="small-playlist-logo"></span>
                                    <p className="person-name">Person 2</p>
                                </div>
                                <div class="listening-person">
                                <span className="small-playlist-logo"></span>
                                    <p className="person-name">Person 3</p>
                                </div>
                                <div class="listening-person">
                                <span className="small-playlist-logo"></span>
                                    <p className="person-name">Person 4</p>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div id="home-bottom-spacing"></div>
            </div>
        </div>
    )

}

export default Home;