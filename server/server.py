from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_socketio import SocketIO, join_room, leave_room, emit, send
from typing import Any, Dict
import util
json_type = Dict[str, object]


class Application:
    def __init__(self, flask_app: Flask, flask_socketio: SocketIO):

        self.app = flask_app
        self.socketio = flask_socketio

    @self.app.route("/", methods=["GET"])
    def home(self):
        ...

    @self.app.route("users/register", methods=["GET", "POST"])
    def register(self, data: json_type):
        random_string = util.id_generator(size=8)

    @self.app.route("users/login", methods=["GET", "POST"])
    def login(self, data: json_type):


    @self.app.route("users/logout")
    def logout(self, data: json_type):
        ...


    @self.socketio.on("join_room")
    def on_join(self, data: json_type):
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

    @self.socketio.on("leave_room")
    def on_leave(self, data: json_type):
        username = data.get('username')
        room = data.get("room")
        if room is None:
            app.logger.info("Room number is not provided")
        leave_room(room)

    app.logger.info(f"{username} has left room {room}")

    def run(self):
        self.socketio.run(self.app, debug=True)



if __name__ == "__main__":
    app = Flask(__name__)
    socketio = SocketIO(app)
    server = Application(app, socketio)
    server.run()
