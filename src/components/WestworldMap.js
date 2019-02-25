import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

class WestworldMap extends Component {
  filteredHosts = () => {
    let result = this.props.hosts.filter(h => h.active == true);
    return result;
  };

  render() {
    return (
      <Segment id="map">
        {this.props.areas.map(a => (
          <Area
            selectHost={this.props.selectHost}
            hosts={this.filteredHosts()}
            area={a}
          />
        ))}
      </Segment>
    );
  }
}

export default WestworldMap;
