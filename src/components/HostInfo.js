import "../stylesheets/HostInfo.css";
import React, { Component } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider
} from "semantic-ui-react";

// area limits for all areas to prevent too many hosts in one area
const limits = {
  high_plains: 8,
  lowlands: 6,
  under_construction: 8,
  pariah: 14,
  python_pass: 14,
  badlands: 10
};

class HostInfo extends Component {
  constructor(props) {
    super(props);

    // state holds all options that will be displayed dropdown menu when changing a host's area
    this.state = {
      options: [
        { key: "high_plains", text: "High Plains", value: "high_plains" },
        { key: "lowlands", text: "Lowlands", value: "lowlands" },
        {
          key: "under_construction",
          text: "Under Construction",
          value: "under_construction"
        },
        { key: "pariah", text: "Pariah", value: "pariah" },
        { key: "python_pass", text: "Python Pass", value: "python_pass" },
        { key: "badlands", text: "Badlands", value: "badlands" }
      ]
    };
  }

  // function that is called when a hosts area is changed
  handleChange = (e, { value }) => {
    // Clean names for all areas to be used to display on the LogPanel
    let names = {
      high_plains: "High Plains",
      lowlands: "Lowlands",
      under_construction: "Under Construction",
      pariah: "Pariah",
      python_pass: "Python Pass",
      badlands: "Badlands"
    };

    // if there are less hosts in an area then allowed, allow host to be moved
    if (this.props.currentCount[value] < limits[value]) {
      // callback from App to change a host location
      this.props.changeLocation(this.props.host[0].id, value);
      // Log this move on the LogPanel
      this.props.addLogItem({
        key: "notify",
        message: `${this.props.host[0].firstName} set in area  ${names[value]}.`
      });
    } else {
      // Log move failure on the LogPanel
      this.props.addLogItem({
        key: "error",
        message: `Too many hosts. Cannot add ${
          this.props.host[0].firstName
        } to ${names[value]}.`
      });
    }
  };

  toggle = () => {
    // toggle host active status boolean
    this.props.changeActiveStatus(this.props.host[0].id);

    // conditionally log to LogPanel the appropriate message based on boolean
    if (this.props.host[0].active === false) {
      this.props.addLogItem({
        key: "warn",
        message: `Activated ${this.props.host[0].firstName}.`
      });
    } else {
      this.props.addLogItem({
        key: "notify",
        message: `Decommissioned ${this.props.host[0].firstName}.`
      });
    }
  };

  render() {
    const currentHost = this.props.host[0];

    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={currentHost.imageUrl}
            floated="left"
            size="small"
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {currentHost.firstName} |{" "}
                {currentHost.gender === "Male" ? (
                  <Icon name="man" />
                ) : (
                  <Icon name="woman" />
                )}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={
                    this.props.host[0].active ? "Active" : "Decommissioned"
                  }
                  checked={this.props.host[0].active}
                  slider
                />
              </Card.Meta>
              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.props.host[0].area}
                options={this.state.options}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default HostInfo;
