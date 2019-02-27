import React from "react";
import "../stylesheets/Headquarters.css";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

const Headquarters = props => {
  // function to find and return the selected host (needed for details)
  function filterSelected() {
    return props.hosts.filter(host => {
      return host.firstName === props.selected;
    });
  }

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        {/* Pass all hosts, selected host, and selected to CS as props */}
        <ColdStorage
          hosts={props.hosts}
          selectedHost={props.selectedHost}
          selected={props.selected}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        {/* Pass show, selected host, and functions to Details */}
        <Details
          show={props.details}
          host={filterSelected()}
          changeActiveStatus={props.changeActiveStatus}
          changeLocation={props.changeLocation}
          currentCount={props.currentCount}
          addLogItem={props.addLogItem}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* Pass two functions and all log info to LogPanel */}
        <LogPanel
          activateAll={props.activateAll}
          toggleActivateAll={props.toggleActivateAll}
          logs={props.logs}
        />
      </Grid.Column>
    </Grid>
  );
};

export default Headquarters;
