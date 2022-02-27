import React, { useEffect } from 'react';
import io from 'socket.io-client';

function Room(props) {
    const { userID } = props;

    let socket = io.connect("http://localhost:5000");

    const randomStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let generatedRandomStr = "";

    for (let i = 0; i < 16; i++) {
        generatedRandomStr += randomStr[Math.floor(Math.random() * 10)];
    }
    

    socket.on('connect', () => {
        socket.emit('create_room', {data: userID, roomId: generatedRandomStr});
    });
    
    useEffect(() => {
            
    }, []);

    return (
        <div className="Room">
            
        </div>
    );
}

export default Room;