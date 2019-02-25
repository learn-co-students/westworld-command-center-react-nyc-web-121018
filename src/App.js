import React, { Component } from "react";
import "./stylesheets/App.css";
import { Segment } from "semantic-ui-react";
import WestworldMap from "./components/WestworldMap";
import Headquarters from "./components/Headquarters";

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
    console.log(this.state.hosts);
  };

  constructor() {
    super();
    this.state = {
      hosts: [],
      areas: [],
      details: []
    };
    this.fetchHosts();
    this.fetchAreas();
  }

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
        />
      </Segment>
    );
  }
}

export default App;
