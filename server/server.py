from flask import Flask, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_cors import CORS, cross_origin
import flask
from spotify_api_objects import client_credentials, spotify_oauth
from typing import Any, Dict
from secret_stuff import env_variables
import util
import requests

json_type = Dict[str, object]

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app)


@app.route("/", methods=["GET"])
def home():
    return jsonify(text="Home page")


@app.route("/user_data", methods=["POST"])
def get_user_data():
    headers = {
        "Authorization": flask.request.args.get("access_token")
    }
    response = requests.get("https://api.spotify.com/v1/me", headers=headers)
    return response.json()


@app.route("/users/<method>", methods=["GET"])
@cross_origin()
def functions(method: str):
    if method == "login":
        return jsonify(url=spotify_oauth.get_authorize_url(state=util.id_generator(size=8)))
    elif method == "register":
        ...
    elif method == "get_token":
        auth_code = flask.request.args.get("code")
        access_token = spotify_oauth.get_access_token(auth_code)
        return jsonify(access_token)
    elif method == "refresh_token":
        refresh_token = flask.request.args.get("refresh_token")
        new_token = spotify_oauth.refresh_access_token(refresh_token)
        return jsonify(new_token)
    elif method == "logout":
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
