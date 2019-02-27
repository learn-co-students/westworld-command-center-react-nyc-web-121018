import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

class WestworldMap extends Component {
  constructor() {
    super();

    this.state = {
      areas: []
    };
  }

  filteredActiveHosts = area => {
    return this.props.hosts.filter(host => {
      return host.area === area.name && host.active === true;
    });
  };

  render() {
    const mapAreas = this.state.areas.map(area => {
      return (
        <Area
          key={area.id}
          area={area}
          hosts={this.filteredActiveHosts(area)}
          selectedHost={this.props.selectedHost}
          selected={this.props.selected}
        />
      );
    });
    return <Segment id="map">{mapAreas}</Segment>;
  }

  componentDidMount() {
    fetch("http://localhost:4000/areas")
      .then(resp => resp.json())
      .then(data => {
        this.setState({ areas: data });
      });
  }
}

export default WestworldMap;
