import React from "react";
import {
Menu,
Icon,
Progress,
Label
} from "semantic-ui-react";
import ReactAudioPlayer from 'react-audio-player'


class MediaPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.updatePlayProgress = this.updatePlayProgress.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.playPause = this.playPause.bind(this);
    this.audioRef = React.createRef();
    this.state = {
      sourceIndex: 0,
      playProgress: 0,
      isPlaying: false
    }
  }
  handlePause = () => { this.setState({isPlaying: false}); }
  handlePlay = () => { this.setState({isPlaying: true}); }
  playPause = () => {const audio = this.audioRef.current.audioEl; if (this.state.isPlaying) {audio.pause();} else {audio.play();}}
  playSource(callUrl) {
    const audio = this.audioRef.current.audioEl;
    var onEnded = this.props.onEnded;
    audio.src=callUrl;

    var playPromise = audio.play();

    // In browsers that don’t yet support this functionality,
    // playPromise won’t be defined.
    if (playPromise !== undefined) {
      playPromise.then(function() {

      }).catch(function(error) {
        console.log("Automatic playback failed: " + error);
        onEnded();
        // Show a UI element to let the user manually start playback.
      });
    }
  }

  updatePlayProgress() {
    const audio = this.audioRef.current.audioEl;
    const {currentTime, duration} = audio;
    var call = this.props.call;

    // this checks to see if it should display the next Source ID
    if (call && ((call.srcList.length - 1) >= (this.state.sourceIndex + 1)) && (currentTime > call.srcList[this.state.sourceIndex + 1].pos)) {
      this.setState({
        sourceIndex: this.state.sourceIndex + 1
      });
    }

    // updates the play percentage progress and current playing time
    this.setState({
      playProgress: currentTime / duration * 100,
      playTime: Math.floor(currentTime)
    });
  }

componentWillUpdate(nextProps) {
  if (nextProps.call && (nextProps.call != this.props.call)) {
    this.setState({
      sourceIndex: 0
    });

  }

}
  componentDidUpdate() {
  }


render(){
  var playEnabled = { "disabled": true }
  var srcNum = "-";
  var sourceId = "-";
  var callUrl = null;
  if (this.props.call) {
     callUrl = media_server + this.props.call.filename;
  }

  if (this.props.call) {
    if (this.props.call.srcList.length > this.state.sourceIndex) {
      srcNum = this.props.call.srcList[this.state.sourceIndex].src;
      if ((typeof this.props.sources == 'undefined') || (typeof this.props.sources[srcNum] == 'undefined')) {
        sourceId = srcNum;
      } else {
        sourceId = this.props.sources[srcNum].srcNickname + " [" + srcNum + "], ";
      }
    }
    playEnabled = {};
  }
  return (
    <Menu.Menu>
    <ReactAudioPlayer
      ref={this.audioRef}
      onPause={this.handlePause}
      onPlay={this.handlePlay}
      listenInterval={500}
      onListen={this.updatePlayProgress}
      onEnded={this.props.onEnded}
      autoPlay
      />


      <Menu.Item onClick={this.playPause}  >

            {
              this.state.isPlaying
                ? (<Icon name="pause"/>)
                : (<Icon name="play"/>)
            }
            </Menu.Item>
            <Menu.Item>
            <Progress inverted percent={this.state.playProgress}/>
            <Label color="black">
              {this.state.playTime}
              Sec
            </Label>
            <Label color="black" className="desktop-only">
              {sourceId}
            </Label>

            </Menu.Item>
      </Menu.Menu>


    /*  <Media>
        {
          mediaProps =>  <Menu.Menu>

          <Menu.Item onClick={() => mediaProps.playPause()} {...playEnabled} >
              <Player src={callUrl} vendor="audio" onEnded={this.props.onEnded} autoPlay={true} onTimeUpdate={this.updatePlayProgress}/>

                {
                  mediaProps.isPlaying
                    ? (<Icon name="pause"/>)
                    : (<Icon name="play"/>)
                }
                </Menu.Item><Menu.Item>
                <Progress inverted percent={this.state.playProgress}/>
                <Label color="black">
                  {this.state.playTime}
                  Sec
                </Label>
                <Label color="black" className="desktop-only">
                  {sourceId}
                </Label>

                </Menu.Item>
                </Menu.Menu>
      }
      </Media>*/

)
}
}
export default MediaPlayer;
