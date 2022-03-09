from SpotifyOAuth import SpotifyClientCredentials, SpotifyOAuth
from secret_stuff import env_variables


spotify_oauth = SpotifyOAuth(env_variables['SPOTIFY_CLIENT_ID'], env_variables["SPOTIFY_CLIENT_SECRET"],
                             env_variables["REDIRECT_URI"], scope='user-read-private playlist-read-private '
                                                                  'user-read-email user-read-playback-state streaming'
                             )
