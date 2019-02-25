import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "./Log";

const LogPanel = props => {
  const logs = props.logs;

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs
          ? logs.map((log, i) => (
              <p key={i} className={log.type}>
                {log.msg}
              </p>
            ))
          : "no activity"}
      </pre>

      <Button
        onClick={props.activateAll}
        fluid
        color={props.allActive === false ? "red" : "green"}
        content={props.allActive === false ? "ACTIVATE ALL" : "DEACTIVATE ALL"}
      />
    </Segment>
  );
};

export default LogPanel;
