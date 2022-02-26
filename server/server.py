from flask import Flask, render_template, request, redirect, url_for, jsonify, redirect
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_cors import CORS, cross_origin
from typing import Any, Dict
from secret_stuff import env_variables
import util
import urllib
import json

json_type = Dict[str, object]

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app)


@app.route("/", methods=["GET"])
def home():
    ...


@app.route("/users/register", methods=["GET", "POST"])
def register(data: json_type):
    ...


@app.route("/users/login", methods=["GET"])
@cross_origin()
def login():
    data = {"state": util.id_generator(size=8),
            "response_type": 'code',
            "scope": "user-read-private user-read-email",
            "client_id": env_variables["SPOTIFY_CLIENT_ID"],
            "client_secret": env_variables["SPOTIFY_CLIENT_SECRET"],
            "redirect_uri": "http://localhost:3000",
            }

    return jsonify(url="https://accounts.spotify.com/authorize?" + urllib.parse.urlencode(data))


@app.route("/users/logout")
def logout(data: json_type):
    ...


@socketio.on("join_room")
def on_join(data: json_type):
    """

    :param data: Data from client side
    :return:
    """
    username = data.get('username', None)
    room = data.get("room", 0)
    if room is None:
        app.logger.error("Room number is not provided")
    join_room(room)
    app.logger.info(f"{username} has entered room {room}")


@socketio.on("leave_room")
def on_leave(data: json_type):
    username = data.get('username')
    room = data.get("room")
    if room is None:
        app.logger.info("Room number is not provided")
    leave_room(room)
    app.logger.info(f"{username} has left room {room}")




if __name__ == "__main__":
    socketio.run(app, debug=True)
