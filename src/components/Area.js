import React, { Component } from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";

class Area extends Component {
  filteredHosts = () => {
    let result = this.props.hosts.filter(h => h.area == this.props.area.name);
    return result;
  };

  render() {
    return (
      <div className="area" id={this.props.area.name}>
        <h3 className="labels">{this.props.area.name}</h3>
        <HostList
          selectHost={this.props.selectHost}
          hosts={this.filteredHosts()}
        />
      </div>
    );
  }
}

Area.propTypes = {
  hosts: function(props, propName, componentName) {
    if (props.hosts.length > props.limit) {
      throw Error(
        `HEY!! You got too many hosts in ${
          props.name
        }. The limit for that area is ${props.limit}. You gotta fix that!`
      );
    }
  }
};

export default Area;
