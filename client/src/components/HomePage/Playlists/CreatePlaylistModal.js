import React, { Component } from 'react'
import { Button, Header, Modal, Grid, Input, Icon, Label } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import CreatedPlaylist from './CreatedPlaylist'
import axios from 'axios'
import $ from 'jquery';

class CreatePlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      newPlaylistName: '',
      newPlaylist: [],
      followObjectArray: [],
      open: false,
      noPlaylistNameError: false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false,
      name: '',
    };


    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleMinusClick = this.handleMinusClick.bind(this);

  }

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value, noPlaylistNameError: false});
  }

  handleSave() {
    var userPlaylists = this.props.playlists.map((playlist) => playlist.playlistName);
    var illegalChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    this.setState({noPlaylistNameError :false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false});
    //Error Handling
    if (this.state.newPlaylistName === '' && this.state.newPlaylist.length === 0) {
      this.setState({noPlaylistNameError :true,
        noSongsInPlaylistError: true,
        playlistNameAlreadyExistsError: false});
      return;
    }

    if (this.state.newPlaylist.length === 0) {
      this.setState({noSongsInPlaylistError: true,
        noPlaylistNameError :false,
        playlistNameAlreadyExistsError: false});
      return;
    }

    if (this.state.newPlaylistName === '') {
      this.setState({noPlaylistNameError :true,
        noSongsInPlaylistError: false,
        playlistNameAlreadyExistsError: false});
      return;
    }

    if (illegalChars.test(this.state.newPlaylistName) == true) {
      this.setState({illegalCharError: true});
      return;
    }

    if (userPlaylists.includes(this.state.newPlaylistName)) {
      this.setState({playlistNameAlreadyExistsError: true,
        noPlaylistNameError :false,
        noSongsInPlaylistError: false});
      return;
    }


    if (this.state.newPlaylist.length !== 0 && this.state.newPlaylistName !== '' && (!userPlaylists.includes(this.state.newPlaylistName))) {
      this.setState({noPlaylistNameError :false,
        noSongsInPlaylistError: false,
        playlistNameAlreadyExistsError: false});

      var newPlaylist = {
         "playlistName" : this.state.newPlaylistName,
         "spotifyPlaylistID" : "testForNow",
         "spotifyPlaylistURI" : "testForNow",
         "songsArrayBySpotifyUserID" : this.state.newPlaylist
      };

      var newPlaylistPayload = {
        newPlaylist: newPlaylist,
        spotifyId: this.props.spotifyId
      };

      axios.post('/api/aplaylist', newPlaylistPayload)
        .then((results) => {
           this.setState({newPlaylistName: '',
            newPlaylist: [],
            followObjectArray: []});

           this.props.updatePlaylists(newPlaylist);
        })
        .catch((err) => {
          throw err;
        });
    }

    this.setState({open:false});
  }

  handleCancel() {
    this.setState({newPlaylistName: '',
      newPlaylist: [],
      followObjectArray: [],
      open:false,
      noPlaylistNameError :false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false});
  }

  handleMinusClick(result) {
    var songsArray = this.state.newPlaylist;
    var followObjectArray = this.state.followObjectArray;
    var index = songsArray.indexOf(result.spotifyId);
    songsArray.splice(index, 1);
    followObjectArray.splice(index, 1);
    this.setState({newPlaylist: songsArray,
      followObjectArray: followObjectArray});
  }

  newPlaylistHandleClick(follow) {
    var songsArray = this.state.newPlaylist;
    var followObjectArray = this.state.followObjectArray;

    if (!songsArray.includes(follow.spotifyId)) {
      songsArray.push(follow.spotifyId);
      followObjectArray.push(follow);
      this.setState({newPlaylist: songsArray,
        followObjectArray: followObjectArray});
    }  

    if (this.state.newPlaylist.length > 0) {
      this.setState({noSongsInPlaylistError: false});
    }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open } = this.state;
    var myStyle;

    return (

      <div>
        <Button id="create-playlist-button" color='red' onClick={this.show(true)}>Create</Button>
        <Modal dimmer={true} open={open} onClose={this.close}>
          <Modal.Header>Create a Playlist</Modal.Header>
          <div id='outer' style={{display: 'flex', flexDirection: 'row', height: '560px', width: '900px', backgroundColor:'red'}}>
      
            <div id='left half' style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '50%', height: '100%'}}>
              <div id='first child' style={{background: 'linear-gradient(0deg, black, #4f4f51)', color: 'white', height: '10%', fontSize: '20px', textAlign: 'center', padding: '.3em'}}>People You're Following</div>
              <FollowingContainer
                spotifyId={this.props.spotifyId}
                newPlaylistHandleClick = {this.newPlaylistHandleClick}
                following={this.props.following}
                refreshFollowing={this.props.refreshFollowing}
                view={this.props.view}
              /> 
            </div>
            <div id='right half' style={{display: 'flex', flexDirection: 'column', backgroundColor: 'white', width: '50%', height: '100%'}}>
              <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', maxHeight: '35px'}}>
                 <div style={{background: 'linear-gradient(0deg, #4f4f51,#939396)', minWidth: '200px', color: 'white', fontSize: '20px', padding: '6px 17px'}}>Playlist Name</div>
                 <Input onChange={this.handlePlaylistNameChange} style={{fontSize: '20px', maxWidth: '240px'}} focus placeholder='Type playlist name...' />
                  {this.state.noPlaylistNameError && <Label style={{padding: '10px', minWidth: '100px', height:'120px', fontSize: '20px'}} basic color='red' pointing='left'>Please include playlist name</Label> ||
                   this.state.illegalCharError && <Label style={{padding: '15px', fontSize: '20px', minHeight: '160px', minWidth: '130px'}} basic color='red' pointing='left'>Playlist name contains illegal characters</Label> ||
                   this.state.playlistNameAlreadyExistsError && <Label style={{padding: '15px', fontSize: '20px', minHeight: '120px', minWidth: '110px'}} basic color='red' pointing='left'>Playlist name already exists</Label>}
              </div>
               <CreatedPlaylist 
                noSongsInPlaylistError={this.state.noSongsInPlaylistError}
                followObjectArray={this.state.followObjectArray}
                handleMinusClick={this.handleMinusClick}
                />
            </div>
          </div>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel} content="Cancel"/>
            <Button positive icon='checkmark' labelPosition='right' content="Save" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}
export default CreatePlaylistModal