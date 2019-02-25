import React, { Component } from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";
import Log from "./Log";
class Area extends Component {
  filteredHosts = () => {
    let result = this.props.hosts.filter(h => h.area == this.props.area.name);
    if (result.length > this.props.area.limit) {
      let rejectedHost = result[result.length - 1];
      rejectedHost.active = false;
      this.errorMessage(rejectedHost.firstName, this.props.area);
      result.pop();

      return result;
    }

    return result;
  };

  errorMessage(name, area) {
    this.props.tooManyHostsError(name, area);
  }

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
