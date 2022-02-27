import React, { useEffect, useState, useContext} from 'react';
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';


function Room(props) {
    const { userID } = props;
    const { roomID } = useParams();

    useEffect(() => {
        // If there is no room ID, i.e. the route is /room, then create a new room.
        // Otherwise, load the room.
        console.log(roomID, roomID === undefined);
        if (roomID === undefined) {
            const randomStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            let generatedRandomStr = "";

            for (let i = 0; i < 16; i++) {
                generatedRandomStr += randomStr[Math.floor(Math.random() * randomStr.length)];
            }
            
            
            setTimeout(() => {
                window.location.href += "/" + generatedRandomStr;
            }, 5000);
        }
        else {
            let socket = io.connect("http://localhost:5000");
            socket.on('connect', () => {
                socket.emit('create_room', {"roomID": roomID});
            });
        }
    }, []);

    return (
        <div className="Room">
            {!roomID ? 
                <div className="new-room-redirect">
                    <h1>Your new room was generated! Redirecting...</h1>
                </div>
            :
                <div className="display-room">

                </div>
            }
        </div>
    );
}

export default Room;