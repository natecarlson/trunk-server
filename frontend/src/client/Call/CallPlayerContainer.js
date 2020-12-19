import { connect } from "react-redux"
import * as callActionCreators from "./call-actions"
import * as talkgroupActionCreators from "../Talkgroups/talkgroup-actions"
import * as sourcesActionCreators from "../Sources/sources-actions"
import * as groupActionCreators from "../Group/group-actions"
import * as systemActionCreators from "../System/system-actions"
import { bindActionCreators } from 'redux'
import CallPlayer from "./CallPlayer"

function mapStateToProps(state, props) {
  return {
		callsById: state.call.byId,
    callsAllIds: state.call.allIds,
    oldestCallTime: state.call.oldestCallTime,
    newestCallTime: state.call.newestCallTime,
    live: state.call.live,
    filterDate: state.call.filterDate,
    filterType: state.call.filterType,
    filterTalkgroups: state.call.filterTalkgroups,
    filterGroupId: state.call.filterGroupId,
    filterStarred: state.call.filterStarred,
    system: state.system.items.find((item) =>  item.shortName === props.match.params.shortName),
    groups: state.group.items[props.match.params.shortName],
    talkgroups: state.talkgroup.items[props.match.params.shortName],
    sources: state.sources.items[props.match.params.shortName],
    callsIsWaiting: state.call.isWaiting,
    systemIsWaiting: state.system.isWaiting,
    talkgroupsIsWaiting: state.talkgroup.isWaiting,
    sourcesIsWaiting: state.sources.isWaiting,
    groupsIsWaiting: state.group.isWaiting,
    shortName: props.match.params.shortName
	}
}

function mapDispatchToProps(dispatch) {
  return {
    groupActions: bindActionCreators(groupActionCreators, dispatch),
    systemActions: bindActionCreators(systemActionCreators, dispatch),
    callActions: bindActionCreators(callActionCreators, dispatch),
    talkgroupActions: bindActionCreators(talkgroupActionCreators, dispatch),
    sourcesActions: bindActionCreators(sourcesActionCreators, dispatch)
  }
}


export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CallPlayer)
