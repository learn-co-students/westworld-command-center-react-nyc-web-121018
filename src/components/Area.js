import React from "react";
import "../stylesheets/Area.css";
import HostList from "./HostList";
import Host from "./Host";

function Area(props) {
  // Upodate area name to display appropriately
  function cleanName(name) {
    let names = name.split("_");
    let cappedNames = names.map(
      name => name.charAt(0).toUpperCase() + name.slice(1)
    );

    return cappedNames.join(" ");
  }

  // create Host cards for all hosts
  const displayHosts = props.hosts.map(host => {
    return (
      <Host
        key={host.id}
        host={host}
        selectedHost={props.selectedHost}
        selected={props.selected}
      />
    );
  });

  // change row display size to be appropriate to the size of the container that will hold the hosts
  const number = () => {
    if (props.area.name === "high_plains" || props.area.name === "lowlands") {
      return "3";
    } else if (
      props.area.name === "under_construction" ||
      props.area.name === "badlands"
    ) {
      return "4";
    } else if (
      props.area.name === "pariah" ||
      props.area.name === "python_pass"
    ) {
      return "6";
    }
  };

  return (
    <div className="area" id={props.area.name}>
      <h3 className="labels">{cleanName(props.area.name)}</h3>
      <HostList display={displayHosts} number={number()} />
    </div>
  );
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
