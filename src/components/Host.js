import React from "react";
import "../stylesheets/Host.css";
import { Card } from "semantic-ui-react";

const Host = props => {
  //callback to set App state selected equale to the name of the host that was clicked on
  function setSelectedHost() {
    props.selectedHost(props.host.firstName);
  }

  return (
    <Card
      className={
        props.host.firstName === props.selected
          ? "a ui card host selected"
          : "a ui card host"
      }
      /* NOTE: The className "host selected" renders a different style than simply "host". */
      onClick={setSelectedHost}
      image={props.host.imageUrl}
      raised
    />
  );
};

export default Host;
