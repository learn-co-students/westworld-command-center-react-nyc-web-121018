import React, { Component } from "react";
import "../stylesheets/Headquarters.css";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import ColdStorage from "./ColdStorage";

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
            details={this.props.details}
          />
        </Grid.Column>
        <Grid.Column width={3}>
          {/* and here. Take visual cues from the screenshot/video in the Readme. */}
        </Grid.Column>
      </Grid>
    );
  }
}

export default Headquarters;
