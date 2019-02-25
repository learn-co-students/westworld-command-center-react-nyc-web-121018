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
    detailsCopy[0].active === false
      ? (detailsCopy[0].active = true)
      : (detailsCopy[0].active = false);
    this.setState({ details: detailsCopy });
    this.createLogMessage(`activating ${detailsCopy[0].firstName}`, "notify");
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
