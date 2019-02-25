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

class HostInfo extends Component {
  state = {
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

  handleChange = (e, { value }) => {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled
    console.log(
      this.props.host.firstName,
      "change location to the id of",
      value
    );
  };

  toggle = () => {
    console.log("The radio button fired");
    this.props.activateHost();
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.host.imageUrl}
            floated="left"
            size="small"
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>
                {this.props.host.firstName} |
                {this.props.host.gender == "Male" ? (
                  <Icon name="man" />
                ) : (
                  <Icon name="woman" />
                )}
              </Card.Header>
              <Card.Meta>
                <Radio
                  onChange={this.toggle}
                  label={
                    this.props.host.active == true ? "Active" : "Not Active"
                  }
                  checked={this.props.host.active == true ? true : false}
                  slider
                />
              </Card.Meta>
              <Divider />
              Current Area:
              <Dropdown
                onChange={this.handleChange}
                value={this.state.value}
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
