import React, { Component } from "react";
import { Card } from "semantic-ui-react";

class HostList extends Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.hosts.map(h => (
          <div className="ui tiny image">
            <img
              data-id={h.id}
              onClick={this.props.selectHost}
              src={h.imageUrl}
            />
          </div>
        ))}
      </Card.Group>
    );
  }
}

export default HostList;
