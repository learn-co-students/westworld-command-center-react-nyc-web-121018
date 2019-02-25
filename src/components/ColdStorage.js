import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import HostList from "./HostList";

class ColdStorage extends Component {
  filteredHosts = () => {
    let result = this.props.hosts.filter(h => h.active == false);
    return result;
  };

  render() {
    return (
      <Segment.Group className="HQComps">
        <Segment compact>
          <h3 className="labels">ColdStorage</h3>
        </Segment>
        <Segment compact>
          <HostList
            selectHost={this.props.selectHost}
            hosts={this.filteredHosts()}
          />
        </Segment>
      </Segment.Group>
    );
  }
}

export default ColdStorage;
