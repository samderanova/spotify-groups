from SpotifyOAuth import SpotifyClientCredentials, SpotifyOAuth
from secret_stuff import env_variables

client_credentials = SpotifyClientCredentials()

spotify_oauth = SpotifyOAuth(client_credentials.client_id, client_credentials.client_secret,
                             env_variables["REDIRECT_URI"], scope='user-read-private playlist-read-private user-read-email user-read-playback-state streaming user-read-birthdate')
