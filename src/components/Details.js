import React from "react";
import { Segment, Image } from "semantic-ui-react";
import * as Images from "../services/Images";
import HostInfo from "./HostInfo";

const Details = props => {
  // Render WW logo if no host is currently selected
  const renderPlaceholderImg = () => (
    <Image size="medium" src={Images.westworldLogo} />
  );

  return (
    <Segment id="details" className="HQComps">
      {/* If App state details is false, render WW Logo, else HostInfo card */}
      {/* For HostInfo: Pass host, and functions to change active status, location,
        area count and log updates on change */}
      {props.show === false ? (
        renderPlaceholderImg()
      ) : (
        <HostInfo
          host={props.host}
          changeActiveStatus={props.changeActiveStatus}
          changeLocation={props.changeLocation}
          currentCount={props.currentCount}
          addLogItem={props.addLogItem}
        />
      )}
    </Segment>
  );
};

export default Details;
