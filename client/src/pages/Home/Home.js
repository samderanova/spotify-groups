import React, { useState, useEffect, useContext } from 'react';
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

                            // Dreamy
    const colorDict = {1: {'color1':'#464C89', 'color2': '#CA95D7', 'color3': '#EFD8EB', 'color4': '#BEE1E6',
                            'color5': '#C9FBD4', 'color6': '#4B8581', 'color7': '#FFFBEF', 'color8': '#4B8581'},
                            //Berry Bush
                        2: {'color1':'#FFFBEF', 'color2': '#651532', 'color3': '#B4C792', 'color4': '#0E3B25',
                            'color5': '#325931', 'color6': '#2A6547', 'color7': '#AFAA99', 'color8': '#940036'},
                            //Melon
                        3: {'color1':'#0E3B25', 'color2': '#2E6949', 'color3': '#F6BD60', 'color4': '#F28482',
                            'color5': '#A9CCB3', 'color6': '#43694E', 'color7': '#F7EDE2', 'color8': '#2A6547'},
                            //Dusk
                        4: {'color1':'#FFFFFF', 'color2': '#9181A5', 'color3': '#454464', 'color4': '#5B7594',
                            'color5': '#1F4571', 'color6': '#231745', 'color7': '#EBE8F3', 'color8': '#231745'},
                            //Candy
                        5: {'color1':'#662C58', 'color2': '#98DACD', 'color3': '#FFD19A', 'color4': '#D675A5',
                            'color5': '#E5A9A9', 'color6': '#662C58', 'color7': '#FFDBDB', 'color8': '#662C58'},
                            //Terracotta
                        6: {'color1':'#FFFFFF', 'color2': '#812203', 'color3': '#E2A569', 'color4': '#99482D',
                            'color5': '#D07846', 'color6': '#3A241A', 'color7': '#EEE1D3', 'color8': '#3A241A'}
                        };

    var paletteNum = 1;
    var currColor1 = colorDict[paletteNum]['color1'];
    var currColor2 = colorDict[paletteNum]['color2'];
    var currColor3 = colorDict[paletteNum]['color3'];
    var currColor4 = colorDict[paletteNum]['color4'];
    var currColor5 = colorDict[paletteNum]['color5'];
    var currColor6 = colorDict[paletteNum]['color6'];
    var currColor7 = colorDict[paletteNum]['color7'];
    var currColor8 = colorDict[paletteNum]['color8'];

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
                        <p className="queue-requester">User name</p>
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

    function setPalette(num) {
        paletteNum = num;
        var r = document.querySelector(':root');
        var rs = getComputedStyle(r);

        currColor1 = colorDict[paletteNum]['color1'];
        currColor2 = colorDict[paletteNum]['color2'];
        currColor3 = colorDict[paletteNum]['color3'];
        currColor4 = colorDict[paletteNum]['color4'];
        currColor5 = colorDict[paletteNum]['color5'];
        currColor6 = colorDict[paletteNum]['color6'];
        currColor7 = colorDict[paletteNum]['color7'];
        currColor8 = colorDict[paletteNum]['color8'];

        r.style.setProperty('--color1', currColor1);
        r.style.setProperty('--color2', currColor2);
        r.style.setProperty('--color3', currColor3);
        r.style.setProperty('--color4', currColor4);
        r.style.setProperty('--color5', currColor5);
        r.style.setProperty('--color6', currColor6);
        r.style.setProperty('--color7', currColor7);
        r.style.setProperty('--color8', currColor8);

    }


    return (
        <div className="Home">
            <div id="body-container" className="Home">
                <div id="home-top-spacing" className="container"></div>
                <Link to="/room">Create Room</Link>
                <div className="row">
                    <div className="col-lg-4">
                        <div className="widget-decoration" id="group-playlist-widget-decor"></div>
                        <div id="leftmostBox" className="w-75 py-2 px-3 m-auto gen-widget">
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
                            <p id="playlist-name-title">Playlist Name</p>
                        </div>
                        <div id="player-top-container" className="row py-2 px-3 m-auto">

                            <div style={{ position: "relative" }}>
                                <div className="row" id="album-logo-vote">

                                    <div class="col-lg-3"></div>

                                    <div class="col-lg-6">
                                        <span id="album-logo" style={{ backgroundImage: `url(${currentAlbum})` }}></span>
                                    </div>

                                    <div class="col-lg-3">                                     
                                        <div id="vote-btns">
                                            <button id="upvote-btn" className="btn" onClick={e => upvote(currentAlbum, e)}>
                                                <i className="vote fa-solid fa-caret-up"></i>
                                            </button>
                                            <button id="downvote-btn" className="btn" onClick={e => downvote(currentAlbum, e)}>
                                                <i className="vote fa-solid fa-caret-down"></i>
                                            </button>
                                        </div>
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
                                <div className="col-lg-6" id="vol-slider-div">
                                    <Slider id="vol-slider" value={value} onChange={changeVolume}/>
                                </div>
                            </div>

                        </div>

                        <div id="player-bottom-container" className="w-75 py-2 px-3 m-auto">
                            <div id="player-buttons" className="row audio-controls align-items-center">
                                <div className="col-md-4">
                                    <span>
                                        <i id="back-btn" className="fa-solid fa-backward-fast"></i>
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <span className="small-playlist-logo" onClick={playPause} style={{ position: "relative" }} id="play-pause-btn">
                                        <i className={`fa-solid ${playPauseIcon}`} style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}></i>
                                    </span>
                                </div>
                                <div className="col-md-4">
                                    <span>
                                        <i id="forward-btn" className="fa-solid fa-forward-fast"></i>
                                    </span>
                                </div>
                            </div>

                            <div id="queue-button-div" className="row align-items-center">
                                <Popup trigger={<button id="queue-button">Queue song</button>}
                                position="top center">
                                <div id="queue-button-popup">
                                    <h3 class="popup-header">Your Playlists</h3>

                                    <Popup trigger={<button class="popup-option">Playlist name</button>}
                                    position="right center">
                                        <div class="songs-popup">
                                            <h5 class="popup-header">Playlist name songs</h5>
                                            {/* onclick function for these buttons will add them to the queue */}
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                        </div>
                                    </Popup>

                                    <Popup trigger={<button class="popup-option">Playlist name</button>}
                                    position="right center">
                                        <div class="songs-popup">
                                            <h5 class="popup-header">Playlist name songs</h5>
                                            {/* onclick function for these buttons will add them to the queue */}
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                        </div>
                                    </Popup>

                                    <Popup trigger={<button class="popup-option">Playlist name</button>}
                                    position="right center">
                                        <div class="songs-popup">
                                            <h5 class="popup-header">Playlist name songs</h5>
                                            {/* onclick function for these buttons will add them to the queue */}
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                            <button class="popup-option">Song name</button>
                                        </div>
                                    </Popup>

                                    
                                </div>
                                </Popup>

                                

                            </div>

                        </div>


                    </div>



                    <div className="col-lg-4">
                        <div className="widget-decoration" id="queue-widget-decor">
                            <p id="queue-name">Queue</p>
                        </div>
                        <div id="queue-box" className="w-75 py-2 px-3 mb-5 m-auto  gen-widget">
                            {queue}
                            <div id="queue-bottom-bar">
                                <div id="switch-queue-pages">
                                    <button className="btn" onClick={e => upvote(currentAlbum, e)}>
                                        <i id="queue-right" className="switch-queue fa-solid fa-caret-up"></i>
                                    </button>
                                    <button className="btn" onClick={e => downvote(currentAlbum, e)}>
                                        <i id="queue-left" className="switch-queue fa-solid fa-caret-down"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="widget-decoration" id="listening-widget-decor">
                            <p id="listening-name">Listening Now</p>
                        </div>
                        <div id="listenerBox" className="w-75 py-2 px-3 m-auto gen-widget">
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

                <div id="themes-row" className="row">
                    <Popup trigger={<button id="theme-button">Themes</button>} position="top center">
                            <div class="songs-popup">
                                <button class="theme-option" onClick={e => setPalette(1, e)}>Dreamy</button>
                                <button class="theme-option" onClick={e => setPalette(2, e)}>Berry Bush</button>
                                <button class="theme-option" onClick={e => setPalette(3, e)}>Melon</button>
                                <button class="theme-option" onClick={e => setPalette(4, e)}>Dusk</button>
                                <button class="theme-option" onClick={e => setPalette(5, e)}>Candy</button>
                                <button class="theme-option" onClick={e => setPalette(6, e)}>Terracotta</button>
                            </div>
                    </Popup>
                </div>

                <div id="very-bottom-spacing"></div>
            </div>
        </div>
    )

}

export default Home;