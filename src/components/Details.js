import React, { Component } from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

class Details extends Component {
  render() {
    return (
      <Segment id="details" className="HQComps">
        {this.props.details.length > 0 ? (
          <HostInfo
            activateHost={this.props.activateHost}
            host={this.props.details[0]}
          />
        ) : (
          <Image size="medium" src={Images.westworldLogo} />
        )}
      </Segment>
    );
  }
} // end of class

export default Details;
