from flask import Flask, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from flask_cors import CORS
import flask
from spotify_api_objects import spotify_oauth
from typing import Any, Dict
from secret_stuff import env_variables
import util
import requests
import urllib.request
import pymongo

json_type = Dict[str, object]

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
app.config['CORS_HEADERS'] = 'Content-Type'
socketio = SocketIO(app, cors_allowed_origins=["http://localhost:3000"])
db_object = pymongo.MongoClient(env_variables["MONGO_URL"])
database = db_object.get_database("SpotiGroup")


@app.route("/", methods=["GET"])
def home():
    return jsonify(text="Home page")


@app.route("/user_data", methods=["GET"])
def get_user_data():
    request = urllib.request.Request("https://api.spotify.com/v1/me")
    request.add_header("Authorization", flask.request.headers["Authorization"])
    response = urllib.request.urlopen(request)
    return response.read()


@app.route("/login_user", methods=["POST"])
def login_user():
    request_data = flask.request.json
    user_collection = database["user_info"]
    user_doc = user_collection.find_one({"user_id": request_data.get("user_id")})
    if not user_doc:
        user_collection.insert_one({
            "user_id": request_data.get("user_id"),
            "display_name": request_data.get("display_name"),
            "access_token": request_data.get("access_token"),
            "refresh_token": request_data.get("refresh_token"),
            "logged_in": True
        })
    else:
        user_collection.update_one({"_id": user_doc["_id"]}, {"$set": {"logged_in": True,
                                                                       "access_token": request_data.get("access_token"),
                                                                       "refresh_token": request_data.get(
                                                                           "refresh_token")}})
    return "200, OK"


@app.route("/get_user_from_db", methods=["POST"])
def get_user():
    user_collection = database["user_info"]
    user_doc = user_collection.find_one({"user_id": flask.request.json.get("user_id")})
    if user_doc:
        user_doc["_id"] = str(user_doc["_id"])
        return user_doc
    return "404"


@app.route("/logout_user", methods=["POST"])
def logout_user():
    request_data = flask.request.json
    user_collection = database["user_info"]
    user_collection.find_one_and_update({"auth_string": request_data.get("auth_string")},
                                        {"$set": {"logged_in": False}})
    return "200"


@app.route("/users/<method>", methods=["GET"])
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


@socketio.on("create_room")
def on_create(data: json_type):
    room_collection = database["room_list"]
    room_id = data.get("roomID")
    room_in_db = room_collection.find(filter={"roomID": room_id}, projection={"_id": 0})
    try:
        room_in_db.next()
    except StopIteration as e:
        room_collection.insert_one({"roomID": room_id, "userIDs": []})
    room_in_db.close()


@socketio.on("join_room")
def on_join(data: json_type):
    """
    :param data: Data from client side
    :return:
    """
    room_collection = database.get_collection("room_list")
    userID = data.get('data')
    roomID = data.get("roomID")
    room_collection.update_one({"roomID": roomID}, {"$push": {"userIDs": userID}})
    join_room(roomID)
    app.logger.info(f"{userID} has joined room {roomID}")
    socketio.emit("join_room_announcement", to=roomID, include_self=True)


@socketio.on("leave_room")
def on_leave(data: json_type):
    userID = data.get('data')
    roomID = data.get("roomID")
    leave_room(roomID)
    app.logger.info(f"{userID} has left room {roomID}")
    socketio.emit("leave_room_announcement", to=roomID)

if __name__ == "__main__":
    socketio.run(app, debug=True)
    db_object.close()
