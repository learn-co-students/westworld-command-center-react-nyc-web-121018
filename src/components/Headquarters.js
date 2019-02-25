import React, { Component } from "react";
import "../stylesheets/Headquarters.css";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

class Headquarters extends Component {
  render() {
    return (
      <Grid celled="internally">
        <Grid.Column width={8}>
          <ColdStorage
            selectHost={this.props.selectHost}
            hosts={this.props.hosts}
          />
        </Grid.Column>
        <Grid.Column width={5}>
          <Details
            activateHost={this.props.activateHost}
            changeHostLocation={this.props.changeHostLocation}
            details={this.props.details}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <LogPanel
            activateAll={this.props.activateAll}
            allActive={this.props.allActive}
            logs={this.props.logs}
          />
        </Grid.Column>
      </Grid>
    );
  }
}

export default Headquarters;
