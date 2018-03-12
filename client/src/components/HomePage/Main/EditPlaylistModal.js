import React, { Component } from 'react'
import { Popup, Button, Header, Image, Modal, Grid, Divider, Input, Label, TextArea } from 'semantic-ui-react'
import FollowingContainer from '../Following/FollowingContainer'
import EditPlaylist from '../Main/EditPlaylist'
import Following from '../Following/Following'
import axios from 'axios'

class EditPlaylistModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
<<<<<<< HEAD
      newPlaylistName: '', 
      newPlaylist: this.props.playlistSongArr,
=======
      newPlaylistName: '',
      newPlaylist: '',
      playlistObjectArray: this.props.playlistSongArr,
      originalPlaylist: null,
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
      open: false,
      noPlaylistNameError: false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false,
    };

    this.handlePlaylistNameChange = this.handlePlaylistNameChange.bind(this);
    this.newPlaylistHandleClick = this.newPlaylistHandleClick.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
<<<<<<< HEAD

     // {this.props.playlistSongArr &&
     //            <div style={{color:'red'}}>{this.props.playlistSongArr.map((result,index)=>

     //              <div>{result.spotifyId}</div>

     //              )}</div>
     //          }


    
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.playlistSongArr !== this.props.playlistSongArr) {
      console.log('Update called - props ', this.props.playlistSongArr );
      var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
      this.setState({newPlaylist: playlistArray});
      console.log('Update called - playlist obj name ', this.props.playlistName);
      this.setState({newPlaylistName: this.props.playlistName});
      console.log('Update called - state ', this.state.newPlaylist );
    }
  }

  //state = { open: false }
=======
    this.handleMinusClick = this.handleMinusClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.playlistSongArr && prevProps.playlistSongArr !== this.props.playlistSongArr) {
      var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
      this.setState({newPlaylist: playlistArray,
        newPlaylistName: this.props.currentPlaylistObj.name,
        playlistObjectArray: this.props.playlistSongArr});
    }
  }
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14

  handlePlaylistNameChange(e) {
    e.preventDefault();
    this.setState({newPlaylistName: e.target.value});
  }

  handleUpdate() {
<<<<<<< HEAD
    // this.setState({newPlaylist: this.props.playlistSongArr});
    console.log('Update called - props ', this.props.playlistSongArr );
    var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
    this.setState({newPlaylist: playlistArray});
    this.setState({newPlaylistName: this.props.playlistName});
    console.log('Update called - state ', this.state.newPlaylist );
=======
    var playlistArray = this.props.playlistSongArr.map((result, index)=> result.spotifyId);
    this.setState({newPlaylist: playlistArray,
      newPlaylistName: this.props.playlistName});
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
  }

  handlePlaylistChange() {
    var newPlaylistSongsArray = this.props.playlistSongArr && this.props.playlistSongArr.map((result,index)=>result.spotifyId);
<<<<<<< HEAD
    console.log('new playlist song array is ', newPlaylistSongsArray);
=======
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
    this.setState({ newPlaylist: newPlaylistSongsArray });
  }

  handleSave() {
    var userPlaylists = this.props.playlists.map((playlist) => playlist.playlistName);
    var illegalChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    var originalPlaylistName = this.props.currentPlaylistObj.name;
    var originalPlaylistNameIndex = userPlaylists.indexOf(originalPlaylistName);
    userPlaylists.splice(originalPlaylistNameIndex, 1)

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
      }

      var updatePlaylistPayload = {
        newPlaylist: newPlaylist,
        spotifyId: this.props.spotifyId,
<<<<<<< HEAD
        originalName: this.props.playlistName
      }

      // axios.post('/api/aplaylist', newPlaylistPayload)
      //   .then((results) => {
      //      console.log('Successfully added new playlist to database!');
      //      this.setState({newPlaylistName: ''});
      //      this.setState({newPlaylist: []});
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     throw err;
      //   });
=======
        originalName: this.props.currentPlaylistObj.name
      }

>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
      axios({
        method: 'put',
        url: '/api/aplaylist',
        data: updatePlaylistPayload
      })
      .then((results) => {
<<<<<<< HEAD

      })
      .catch((err) => {

      });

    }
    //this.setState({open:false});
=======
        this.props.updatePlaylists(newPlaylist);
      })
      .catch((err) => {
         console.log('AXIOS PUT REQUEST ERROR!', err);
      });

    }
    this.setState({open:false});
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
  }



  handleCancel() {
    this.props.getAPlaylist();
    this.setState({newPlaylistName: '',
      newPlaylist: [],
      playlistObjectArray: this.props.playlistSongArr,
      open:false,
      noPlaylistNameError :false,
      noSongsInPlaylistError: false,
      playlistNameAlreadyExistsError: false,
      illegalCharError: false});
  }


  handleMinusClick(result) {
    var songsArray = this.state.newPlaylist;
    var playlistObjectArray = this.state.playlistObjectArray;
    var index = songsArray.indexOf(result.spotifyId);
    songsArray.splice(index, 1);
    playlistObjectArray.splice(index, 1);

    this.setState({newPlaylist: songsArray,
      playlistObjectArray: playlistObjectArray});
  }

  newPlaylistHandleClick(follow) {
    var songsArray = this.state.newPlaylist;
    var playlistObjectArray = this.state.playlistObjectArray;

    if (!songsArray.includes(follow.spotifyId)) {
      songsArray.push(follow.spotifyId);
      playlistObjectArray.push(follow);
      this.setState({newPlaylist: songsArray,
        playlistObjectArray: playlistObjectArray});
    }  

    if (this.state.newPlaylist.length > 0) {
      this.setState({noSongsInPlaylistError: false});
    }

  }

  show = dimmer => () => this.setState({ dimmer, open: true })
  close = () => this.setState({ open: false })

  render() {
    const { open, dimmer } = this.state
<<<<<<< HEAD
    console.log('this state song array is', this.state.newPlaylist);
    return (
      <div>
        <Button color='grey' onClick={this.show(true)}>Edit</Button>
        <Modal dimmer={false} open={open} onClose={this.close}>
          <Modal.Header>Edit a Playlist</Modal.Header>
          <Modal.Content image>
          <div>

          </div>

          <Grid columns={2} stackable>
            <Grid.Column>
              {this.props.spotifyId && ( <FollowingContainer
                spotifyId={this.props.spotifyId} newPlaylistHandleClick = {this.newPlaylistHandleClick}
              /> ) }
            </Grid.Column>

            <Header>
              {this.state.noPlaylistNameError &&
                <div style={{color:'red'}}>No Playlist Name</div>
              }
            </Header>



            <Grid.Column>
            <Header>{this.state.newPlaylist.length }</Header>
            <Header>{this.state.newPlaylistName}</Header>


            <Header>
              {this.state.noSongsInPlaylistError &&
                <div style={{color:'red'}}>No Songs in Playlist</div>
              }
            </Header>



            <Header>
            </Header>
              Playlist Name
              <input value={this.state.newPlaylistName} onChange={this.handlePlaylistNameChange}></input>
               {this.state.newPlaylist.map((result, index) => (
               <div> {'-'}
                {result}
               </div>
                ))}
            </Grid.Column>

            

          </Grid>

          </Modal.Content>
          <Modal.Actions>
            <Button onClick={this.handleUpdate}>Undo All Changes</Button>
            <Button color='black' onClick={this.handleCancel}>
              Cancel
            </Button>
=======
    return (
       <div>
        <Button color='red' onClick={this.show(true)}>Edit</Button>
        <Modal dimmer={true} open={open} onClose={this.close}>
          <Modal.Header>{`Edit a Playlist`}</Modal.Header>
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
                 <TextArea onChange={this.handlePlaylistNameChange} style={{fontSize: '20px', maxWidth: '240px', minWidth: '240px'}} focus placeholder='Type playlist name...'>{this.props.currentPlaylistObj.name}</TextArea>
                  {this.state.noPlaylistNameError && <Label style={{padding: '10px', minWidth: '100px', height:'120px', fontSize: '20px'}} basic color='red' pointing='left'>Please include playlist name</Label> ||
                   this.state.illegalCharError && <Label style={{padding: '15px', fontSize: '20px', minHeight: '160px', minWidth: '130px'}} basic color='red' pointing='left'>Playlist name contains illegal characters</Label> ||
                   this.state.playlistNameAlreadyExistsError && <Label style={{padding: '15px', fontSize: '20px', minHeight: '120px', minWidth: '110px'}} basic color='red' pointing='left'>Playlist name already exists</Label>}
              </div>
              <EditPlaylist
                noSongsInPlaylistError={this.state.noSongsInPlaylistError}
                playlistObjectArray={this.state.playlistObjectArray}
                handleMinusClick={this.handleMinusClick}
              />
            </div>
          </div>
          <Modal.Actions>
            <Button color='black' onClick={this.handleCancel} content="Cancel"/>
>>>>>>> 1bc833f2637069ad7f79b08180e1e0d2e94a7d14
            <Button positive icon='checkmark' labelPosition='right' content="Save" onClick={this.handleSave} />
          </Modal.Actions>
        </Modal>
      </div>
    )
  }
}

export default EditPlaylistModal
