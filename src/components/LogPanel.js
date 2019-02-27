import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

const LogPanel = props => {
  // function to display logs based on type of log
  function Logs(array) {
    let logs = [];

    array.map(log => {
      if (log.key === "warn") {
        return logs.unshift(Log.warn(log.message));
      } else if (log.key === "notify") {
        return logs.unshift(Log.notify(log.message));
      } else if (log.key === "error") {
        return logs.unshift(Log.error(log.message));
      }
    });
    return logs;
  }

  // Display all logs and button to toggle active status of all hosts
  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {Logs(props.logs).map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      <Button
        fluid
        color={props.activateAll ? "green" : "red"}
        content={props.activateAll ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={props.toggleActivateAll}
      />
    </Segment>
  );
};

export default LogPanel;
