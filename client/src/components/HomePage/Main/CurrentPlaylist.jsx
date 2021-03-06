/* eslint-disable max-len */
import React from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import CurrentPlaylistSong from './CurrentPlaylistSong';
import EditPlaylistModal from './EditPlaylistModal';
<<<<<<< HEAD
=======
import DeletePlaylistModal from './DeletePlaylistModal';
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14

class CurrentPlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistSongArr: [],
    };

    this.saveToSpotify = this.saveToSpotify.bind(this);
    this.songMapFunction = this.songMapFunction.bind(this);
    this.getAPlaylist();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentPlaylistObj.name !== this.props.currentPlaylistObj.name || this.props.currentPlaylistObj.updated) {
      this.props.currentPlaylistObj.updated = false;
      this.getAPlaylist();
    }
  }

  getAPlaylist() {
    axios.get(`/api/aplaylist?spotifyUserId=${this.props.spotifyUserId}&spotifyPlaylistURI=${this.props.currentPlaylistObj.playlistURI}&playlistName=${this.props.currentPlaylistObj.name}`)
      .then((response) => {
        this.setState({
          playlistSongArr: response.data.DBResponse,
          songsArrayBySpotifyUserID: response.data.songsArrayBySpotifyUserID,
        });
      })
      .catch(err => err);
  }

  songMapFunction(spotifyUserId) {
    console.log('CurrentPlaylist is being called: this.state.playlistSongArr is', this.state.playlistSongArr);
    console.log('spotifyUserId: ', spotifyUserId);
    let songObj;
    this.state.playlistSongArr.forEach((item) => {
      if (item.spotifyId === spotifyUserId) songObj = item;
    });
    return (songObj && <CurrentPlaylistSong
      key={songObj.currentMySong.trackID}
      user={songObj.mySongUsername}
      trackObj={songObj.currentMySong}
    />);
  }

  saveToSpotify() {
    const arrMapFunction = item => `spotify:track:${item.currentMySong.trackID}`;
    const songURIs = this.state.playlistSongArr.map(arrMapFunction);
    axios({
      method: 'post',
      url: '/api/spotifyAPI/createPlaylist',
      data: {
        songURIs,
        playlistName: this.props.currentPlaylistObj.name,
        spotifyUserID: this.props.spotifyUserId,
      },
    });
  }

  render() {
    return (
<<<<<<< HEAD
      <div>
        <h1 style={{ textAlign: 'center' }}>{this.props.currentPlaylistObj.name}
          <button
            onClick={this.makeArrayofURIs}
            style={{ fontSize: 15, marginLeft: 20 }}
          >Save this Playlist on Spotify
          </button>
          <EditPlaylistModal playlistName={this.props.currentPlaylistObj.name} spotifyId={this.props.spotifyUserId} playlistSongArr={this.state.playlistSongArr} />
        </h1>
        <div>{this.state.tracksBySpotifyUserId}</div>
        {this.state.playlistSongArr.length > 0 && this.state.songsArrayBySpotifyUserID.map(this.songMapFunction)}
=======
      <div className="current-playlist">
        <div className="button-row">
          <DeletePlaylistModal
            playlists={this.props.playlists}
            updatePlaylists={this.props.updatePlaylists}
            playlistName={this.props.currentPlaylistObj.name}
            spotifyId={this.props.spotifyUserId}
            playlistSongArr={this.state.playlistSongArr}
          />
          <h1 className="title">{this.props.currentPlaylistObj.name}</h1>
          <EditPlaylistModal
            playlists={this.props.playlists}
            updatePlaylists={this.props.updatePlaylists}
            currentPlaylistObj={this.props.currentPlaylistObj}
            spotifyId={this.props.spotifyUserId}
            playlistSongArr={this.state.playlistSongArr}
            refreshFollowing={this.props.refreshFollowing}
            view={this.props.view}
            getAPlaylist={this.getAPlaylist.bind(this)}
          />
        </div>
        <div className="save-to-spotify">
          <Button onClick={this.saveToSpotify}>Save this Playlist on Spotify</Button>
        </div>
        <div>{this.state.tracksBySpotifyUserId}</div>
        {
          this.state.playlistSongArr && this.state.playlistSongArr.length > 0 &&
          this.state.songsArrayBySpotifyUserID.map(this.songMapFunction)
        }
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
      </div>
    );
  }
}

export default CurrentPlaylist;
