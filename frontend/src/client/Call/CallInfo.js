import React from "react";
import {
  Header,
  Divider,
  List,
  Segment,
  Statistic,
  Icon
} from "semantic-ui-react";

// ----------------------------------------------------
class CallInfo extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    var srcList = "";
    var transcriptionList = "";
    var callLength = "-";
    var callFreq = "-";
    var callDate = "-";
    var callTime = "-";
    var talkgroupNum = "-";
    if (this.props.call) {
      const currentCall = this.props.call;
      var time = new Date(currentCall.time);
      callTime = time.toLocaleTimeString();
      callDate = time.toLocaleDateString();
      if (currentCall.freq) {
        var freq = currentCall.freq / 1000000;
        callFreq = Math.round(freq * 1000) / 1000;
      }

      srcList = currentCall.srcList.map((source, index) => <List.Item key={index}>{source.src}
        [{source.pos}]</List.Item>);

      transcriptionList = currentCall.transcriptionList.map((transcription, index) => <List.Item key={index}>{transcription.text}
        [{transcription.pos}]</List.Item>);

      callLength = currentCall.len;
      talkgroupNum = currentCall.talkgroupNum;
    }



    return (
      <Segment padded>
        <Header as='h1'>{this.props.header}</Header>
        <List bulleted horizontal link>
          {srcList}
        </List>
        <Divider/>
        <List bulleted horizontal link>
          {transcriptionList}
        </List>
        <Divider/>
        <Statistic size='small'>
          <Statistic.Label>Seconds</Statistic.Label>
          <Statistic.Value>{callLength}</Statistic.Value>
        </Statistic>
        <Statistic size='small'>
          <Statistic.Label>Talkgroup</Statistic.Label>
          <Statistic.Value>{talkgroupNum}</Statistic.Value>
        </Statistic>

        <List divided verticalAlign='middle'>
          <List.Item>
            <Icon name="wait"/>
            <List.Content>
              {callTime}
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon name="calendar outline"/>
            <List.Content>
              {callDate}
            </List.Content>
          </List.Item>
          <List.Item>
            <Icon name="cubes"/>
            <List.Content>
              {callFreq} MHz
            </List.Content>
          </List.Item>
        </List>
      </Segment>

    );
    }
  }

  export default CallInfo;
