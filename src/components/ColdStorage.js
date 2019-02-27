import React from "react";
import { Segment } from "semantic-ui-react";
import Host from "./Host";
import HostList from "./HostList";

function ColdStorage(props) {
  // filter all hosts that have an active status of false, and display them in ColdStorage
  let coldStorageHosts = props.hosts.filter(host => {
    return host.active === false;
  });

  // map over all host that should be displayed and create a card for them
  const displayHosts = coldStorageHosts.map(host => {
    return (
      <Host
        key={host.id}
        host={host}
        selectedHost={props.selectedHost}
        selected={props.selected}
      />
    );
  });

  return (
    <Segment.Group className="HQComps">
      <Segment compact>
        <h3 className="labels">ColdStorage</h3>
      </Segment>
      <Segment compact>
        {/* Use HostList to display individual host thumbnails */}
        <HostList display={displayHosts} number={"9"} />
      </Segment>
    </Segment.Group>
  );
}

export default ColdStorage;
