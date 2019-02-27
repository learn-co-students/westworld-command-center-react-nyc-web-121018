import React from "react";
import { Card } from "semantic-ui-react";

const HostList = props => {
  //               items based on size of area   filtered hosts to display
  return <Card.Group itemsPerRow={props.number}>{props.display}</Card.Group>;
};

export default HostList;
