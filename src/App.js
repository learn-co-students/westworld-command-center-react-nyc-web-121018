import React, { Component } from "react";
import "./stylesheets/App.css";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./components/WestworldMap";
import Headquarters from "./components/Headquarters";
import Log from "./components/Log";

class App extends Component {
  selectHost = e => {
    let id = e.target.dataset.id;
    this.findHostById(id);
  };

  findHostById = id => {
    let copyOfHosts = [...this.state.hosts];
    let foundHost = copyOfHosts.find(h => h.id == id);
    this.setState({ details: [foundHost] });
  };

  activateHost = () => {
    let detailsCopy = [...this.state.details];

    if (detailsCopy[0].active === false) {
      detailsCopy[0].active = true;
      this.createLogMessage(`activated ${detailsCopy[0].firstName}`, "notify");
    } else {
      detailsCopy[0].active = false;
      this.createLogMessage(
        `deactivated ${detailsCopy[0].firstName}`,
        "notify"
      );
    }
    this.setState({ details: detailsCopy });
  };

  createLogMessage = (message, tone) => {
    let logCopy = [...this.state.logs];
    if (tone === "warn") {
      logCopy.unshift(Log.warn(message));
    }
    if (tone == "notify") {
      logCopy.unshift(Log.notify(message));
    }
    if (tone == "error") {
      logCopy.unshift(Log.error(message));
    }

    this.setState({ logs: logCopy });
  };

  changeHostLocation = (e, value) => {
    console.log("changing location");
    console.log(e.target, value);
    let detailsCopy = [...this.state.details];
    detailsCopy[0].area = value;
    this.setState({ details: detailsCopy });
    this.createLogMessage(
      `changed location of ${detailsCopy[0].firstName} to ${
        detailsCopy[0].area
      }`,
      "notify"
    );
  };

  constructor() {
    super();
    this.state = {
      hosts: [],
      areas: [],
      details: [],
      allActive: false,
      logs: [Log.notify("Welcome User")]
    };
    this.fetchHosts();
    this.fetchAreas();
    this.areAllHostsActive();
  }

  activeCondition = host => {
    return host.active === true;
  };

  areAllHostsActive = () => {
    if (this.state.hosts.every(this.activeCondition)) {
      this.setState({ allActive: true });
    } else {
      this.setState({ allActive: false });
    }
  };

  tooManyHostsError = (name, area) => {
    console.log(name, area);
    this.createLogMessage(
      `Could not add ${name} to ${
        area.name
      } as it would exceed the maximum of ${area.limit} hosts`,
      "error"
    );
  };

  activateAll = () => {
    let copyOfHosts = [...this.state.hosts];
    if (this.state.allActive === false) {
      copyOfHosts.map(h => (h.active = true));
    } else {
      copyOfHosts.map(h => (h.active = false));
    }
    //
    this.setState({ hosts: copyOfHosts });
    this.areAllHostsActive();
    this.createLogMessage("Activating all hosts", "warn");
  };

  fetchHosts = () => {
    fetch("http://localhost:4000/hosts")
      .then(r => r.json())
      .then(r => this.setState({ hosts: r }));
  };

  fetchAreas = () => {
    fetch("http://localhost:4000/areas")
      .then(r => r.json())
      .then(r => this.setState({ areas: r }));
  };

  render() {
    return (
      <Segment id="app">
        <WestworldMap
          selectHost={this.selectHost}
          hosts={this.state.hosts}
          areas={this.state.areas}
          tooManyHostsError={this.tooManyHostsError}
        />
        <Headquarters
          details={this.state.details}
          hosts={this.state.hosts}
          areas={this.state.areas}
          selectHost={this.selectHost}
          activateHost={this.activateHost}
          changeHostLocation={this.changeHostLocation}
          activateAll={this.activateAll}
          allActive={this.state.allActive}
          logs={this.state.logs}
        />
      </Segment>
    );
  }
}

export default App;
